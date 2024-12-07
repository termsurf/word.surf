import groupBy from 'lodash/groupBy'
import keyBy from 'lodash/keyBy'
import { bigintToIdTone } from '~/lib/shared/utilities/bigint'
import { intToIdTone } from '~/lib/shared/utilities/int'
import { db } from '~/lib/shared/utilities/kysely'
import { removeNulls } from '~/lib/shared/utilities/object'
import {
  CreateVideoCollection,
  FindVideoCollections,
} from './constants'

export async function createVideoCollection(
  source: CreateVideoCollection,
) {
  const input = CreateVideoCollection.parse(source)

  return await db
    .insertInto('video_collection')
    .returningAll()
    .values({
      path: input.path,
    })
    .executeTakeFirstOrThrow()
}

export async function deleteVideoCollection(
  source: CreateVideoCollection,
) {
  const input = CreateVideoCollection.parse(source)

  await db
    .deleteFrom('video_collection')
    .where('path', '=', input.path)
    .execute()
}

export function listVideoCollections() {}

// SELECT i.id, i.video_url -- Replace 'video_url' with the actual column name for the video URL if needed
// FROM videos i
// JOIN video_collection_items ici ON i.id = ici.videos_id
// JOIN video_collections ic ON ici.video_collections_id = ic.id
// WHERE ic.id IN (1, 2, 3); -- Replace (1, 2, 3) with the actual collection IDs you want to filter by
export async function findVideoCollections(
  source: FindVideoCollections,
) {
  const input = FindVideoCollections.parse(source)

  const collections = await db
    .selectFrom('video_collection')
    .selectAll()
    .where('path', 'in', input.paths)
    .execute()

  const videoCollectionItems = await db
    .selectFrom('video_collection_item')
    .selectAll()
    .where(
      'collection__id',
      'in',
      collections.map(x => x.id),
    )
    .execute()

  const videoCollectionItemsByCollectionId = groupBy(
    videoCollectionItems,
    'collection__id',
  )

  const videos = await db
    .selectFrom('video')
    .selectAll()
    .where(
      'id',
      'in',
      videoCollectionItems.map(x => x.id),
    )
    .execute()

  const videosById = keyBy(videos, 'id')

  const videoFiles = await db
    .selectFrom('video_file')
    .selectAll()
    .where(
      'base__id',
      'in',
      videos.map(x => x.id),
    )
    .execute()

  const videoFilesByVideoId = groupBy(videoFiles, 'base__id')

  const output: Array<any> = []

  for (const collection of collections) {
    const items =
      videoCollectionItemsByCollectionId[collection.id] ?? []

    const itemOutput: any = {
      id: intToIdTone(collection.id),
      path: collection.path,
      items: [],
    }

    output.push(itemOutput)

    for (const videoCollectionItem of items) {
      const video = videosById[videoCollectionItem.video__id]
      const files =
        videoFilesByVideoId[videoCollectionItem.video__id] ?? []

      const item = {
        id: bigintToIdTone(videoCollectionItem.id),
        slug: videoCollectionItem.slug,
        video: {
          id: bigintToIdTone(video.id),
          files: files.map(file => ({
            id: bigintToIdTone(file.id),
            url: file.url,
            format: file.format,
          })),
        },
      }
      itemOutput.items.push(item)
    }
  }

  return removeNulls(output)
}
