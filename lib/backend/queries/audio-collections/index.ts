import groupBy from 'lodash/groupBy'
import keyBy from 'lodash/keyBy'
import { bigintToIdTone } from '~/lib/shared/utilities/bigint'
import { intToIdTone } from '~/lib/shared/utilities/int'
import { db } from '~/lib/shared/utilities/kysely'
import { removeNulls } from '~/lib/shared/utilities/object'
import {
  CreateRecordingCollection,
  FindRecordingCollections,
} from './constants'

export async function createRecordingCollection(
  source: CreateRecordingCollection,
) {
  const input = CreateRecordingCollection.parse(source)

  return await db
    .insertInto('audio_collection')
    .returningAll()
    .values({
      path: input.path,
    })
    .executeTakeFirstOrThrow()
}

export async function deleteRecordingCollection(
  source: CreateRecordingCollection,
) {
  const input = CreateRecordingCollection.parse(source)

  await db
    .deleteFrom('audio_collection')
    .where('path', '=', input.path)
    .execute()
}

export function listRecordingCollections() {}

// SELECT i.id, i.audio_url -- Replace 'audio_url' with the actual column name for the audio URL if needed
// FROM audios i
// JOIN audio_collection_items ici ON i.id = ici.audios_id
// JOIN audio_collections ic ON ici.audio_collections_id = ic.id
// WHERE ic.id IN (1, 2, 3); -- Replace (1, 2, 3) with the actual collection IDs you want to filter by
export async function findRecordingCollections(
  source: FindRecordingCollections,
) {
  const input = FindRecordingCollections.parse(source)

  const collections = await db
    .selectFrom('audio_collection')
    .selectAll()
    .where('path', 'in', input.paths)
    .execute()

  const audioCollectionItems = await db
    .selectFrom('audio_collection_item')
    .selectAll()
    .where(
      'collection__id',
      'in',
      collections.map(x => x.id),
    )
    .execute()

  const audioCollectionItemsByCollectionId = groupBy(
    audioCollectionItems,
    'collection__id',
  )

  const audios = await db
    .selectFrom('audio')
    .selectAll()
    .where(
      'id',
      'in',
      audioCollectionItems.map(x => x.id),
    )
    .execute()

  const audiosById = keyBy(audios, 'id')

  const audioFiles = await db
    .selectFrom('audio_file')
    .selectAll()
    .where(
      'base__id',
      'in',
      audios.map(x => x.id),
    )
    .execute()

  const audioFilesByRecordingId = groupBy(audioFiles, 'base__id')

  const output: Array<any> = []

  for (const collection of collections) {
    const items =
      audioCollectionItemsByCollectionId[collection.id] ?? []

    const itemOutput: any = {
      id: intToIdTone(collection.id),
      path: collection.path,
      items: [],
    }

    output.push(itemOutput)

    for (const audioCollectionItem of items) {
      const audio = audiosById[audioCollectionItem.audio__id]
      const files =
        audioFilesByRecordingId[audioCollectionItem.audio__id] ?? []

      const item = {
        id: bigintToIdTone(audioCollectionItem.id),
        slug: audioCollectionItem.slug,
        audio: {
          id: bigintToIdTone(audio.id),
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
