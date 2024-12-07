import groupBy from 'lodash/groupBy'
import keyBy from 'lodash/keyBy'
import omit from 'lodash/omit'
import {
  bigintToIdTone,
  idToBigIntTone,
} from '~/lib/shared/utilities/bigint'
import { matchToneCode8 } from '~/lib/shared/utilities/id'
import { idToIntTone, intToIdTone } from '~/lib/shared/utilities/int'
import { db } from '~/lib/shared/utilities/kysely'
import { removeNulls } from '~/lib/shared/utilities/object'
import { getUserIdAsInt } from '../users'
import {
  CreateImageCollection,
  FindImageCollectionsBySlugs,
} from './constants'

export async function batchSaveImageCollection(collection: {
  path: string
  items: Array<{ slug: string; image__id }>
}) {
  let collectionId
  let collectionSlug = collection.path

  await db.transaction().execute(async tx => {
    if (collection.path) {
      const existing = await tx
        .selectFrom('image_collection')
        .select(['id'])
        .where('path', '=', collection.path)
        .executeTakeFirst()

      collectionId = existing?.id
    }

    if (!collectionId) {
      const record = await tx
        .insertInto('image_collection')
        .returning('id')
        .values({ path: collection.path } as any)
        .executeTakeFirstOrThrow()

      collectionId = record.id
    }

    const existingItems = await tx
      .selectFrom('image_collection_item')
      .select(['id', 'slug'])
      .where('collection__id', '=', collectionId)
      .execute()

    const inputItemsBySlug = keyBy(collection.items, 'slug')
    const existingItemsBySlug = keyBy(existingItems, 'slug')

    let createdItems: Array<any> = []
    let updatedItems: Array<any> = []
    let deletedItems: Array<any> = []

    for (const existingItem of existingItems) {
      const inputItem = inputItemsBySlug[existingItem.slug]
      if (inputItem) {
        updatedItems.push(inputItem)
      } else {
        deletedItems.push(inputItem)
      }
    }

    for (const inputItem of collection.items) {
      const existingItem = existingItemsBySlug[inputItem.slug]
      if (!existingItem) {
        createdItems.push(inputItem)
      }
    }

    if (createdItems.length) {
      await tx
        .insertInto('image_collection_item')
        .returningAll()
        .values(
          createdItems.map(x => ({
            ...x,
            collection__id: collectionId,
          })),
        )
        .execute()
    }

    if (updatedItems.length) {
      for (const updatedItem of updatedItems) {
        await tx
          .updateTable('image_collection_item')
          .set(omit(updatedItem, ['id', 'image']))
          .where('id', '=', updatedItem.id)
          .execute()
      }
    }

    if (deletedItems.length) {
      await tx
        .deleteFrom('image_collection_item')
        .where(
          'id',
          'in',
          deletedItems.map(x => String(idToBigIntTone(x.id))),
        )
        .execute()
    }
  })

  const [returnedCollection] = await findImageCollectionsBySlugs({
    paths: [collectionSlug],
  })

  return returnedCollection
}

export async function createImageCollection(
  source: CreateImageCollection,
) {
  const input = CreateImageCollection.parse(source)
  const userId = await getUserIdAsInt({ key: input.userKey })

  return await db
    .insertInto('image_collection')
    .returningAll()
    .values({
      path: input.path,
    })
    .executeTakeFirstOrThrow()
}

export async function deleteImageCollection(
  source: CreateImageCollection,
) {
  const input = CreateImageCollection.parse(source)
  const userId = await getUserIdAsInt({ key: input.userKey })
  const collectionId = await getImageCollectionId({
    userId,
    key: source.path,
  })

  await db.transaction().execute(async tx => {
    await tx
      .deleteFrom('image_collection_item')
      .where('collection__id', '=', collectionId)
      .execute()

    await tx
      .deleteFrom('image_collection')
      .where('id', '=', collectionId)
      .execute()
  })
}

export async function getImageCollectionId({
  userId,
  key,
}: {
  userId: number
  key: string
}) {
  if (matchToneCode8(key)) {
    return idToIntTone(key)
  }

  const collection = await db
    .selectFrom('image_collection')
    .select(['id'])
    .where('path', '=', key)
    .executeTakeFirstOrThrow()

  return collection.id
}

export function listImageCollections() {}

// SELECT i.id, i.image_url -- Replace 'image_url' with the actual column name for the image URL if needed
// FROM images i
// JOIN image_collection_items ici ON i.id = ici.images_id
// JOIN image_collections ic ON ici.image_collections_id = ic.id
// WHERE ic.id IN (1, 2, 3); -- Replace (1, 2, 3) with the actual collection IDs you want to filter by
export async function findImageCollectionsBySlugs(
  source: FindImageCollectionsBySlugs,
) {
  const input = FindImageCollectionsBySlugs.parse(source)

  const collections = await db
    .selectFrom('image_collection')
    .selectAll()
    .where('path', 'in', input.paths)
    .execute()

  const imageCollectionItems = await db
    .selectFrom('image_collection_item')
    .selectAll()
    .where(
      'collection__id',
      'in',
      collections.map(x => x.id),
    )
    .execute()

  const imageCollectionItemsByCollectionId = groupBy(
    imageCollectionItems,
    'collection__id',
  )

  const images = await db
    .selectFrom('image')
    .selectAll()
    .where(
      'id',
      'in',
      imageCollectionItems.map(x => x.image__id),
    )
    .execute()

  const imagesById = keyBy(images, 'id')

  const imageFiles = await db
    .selectFrom('image_file')
    .selectAll()
    .where(
      'base__id',
      'in',
      images.map(x => x.id),
    )
    .execute()

  const imageFilesByImageId = groupBy(imageFiles, 'base__id')

  const output: Array<any> = []

  for (const collection of collections) {
    const items =
      imageCollectionItemsByCollectionId[collection.id] ?? []

    const itemOutput: any = {
      id: intToIdTone(collection.id),
      path: collection.path,
      items: [],
    }

    output.push(itemOutput)

    for (const imageCollectionItem of items) {
      const image = imagesById[imageCollectionItem.image__id]
      const files =
        imageFilesByImageId[imageCollectionItem.image__id] ?? []

      const item = {
        id: bigintToIdTone(imageCollectionItem.id),
        slug: imageCollectionItem.slug,
        image: {
          id: bigintToIdTone(image.id),
          preview: image.preview,
          files: files.map(file => ({
            id: bigintToIdTone(file.id),
            url: file.url,
            width: file.width,
            height: file.height,
            format: file.format,
          })),
        },
      }
      itemOutput.items.push(item)
    }
  }

  return removeNulls(output)
}
