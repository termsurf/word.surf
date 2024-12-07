import { resolveLanguageStrings } from '~/lib/backend/queries/language-strings'
import { getUserIdAsInt } from '~/lib/backend/queries/users'
import { bigintToIdTone } from '~/lib/shared/utilities/bigint'
import { intToIdTone } from '~/lib/shared/utilities/int'
import { db } from '~/lib/shared/utilities/kysely'
import { removeNulls } from '~/lib/shared/utilities/object'
import {
  CreateLanguageStringCollection,
  ListLanguageStringsForCollectionSlugs,
} from './constants'

export function listLanguageStringCollections() {}

export async function createStringCollection(
  source: CreateLanguageStringCollection,
) {
  const input = CreateLanguageStringCollection.parse(source)
  const userId = await getUserIdAsInt({ key: input.userKey })

  return await db
    .insertInto('language_string_collection')
    .returningAll()
    .values({
      slug: input.slug,
      user__id: userId,
    })
    .executeTakeFirstOrThrow()
}

export async function listLanguageStringsByCollectionSlugs(
  source: ListLanguageStringsForCollectionSlugs,
) {
  const input = ListLanguageStringsForCollectionSlugs.parse(source)
  const userId = await getUserIdAsInt({ key: input.userKey })

  const strings = await db
    .selectFrom('language_string')
    .selectAll()
    .innerJoin(
      'language_string_collection_item',
      'language_string.id',
      'language_string_collection_item.string__id',
    )
    .innerJoin(
      'language_string_collection',
      'language_string_collection_item.collection__id',
      'language_string_collection.id',
    )
    .where('language_string_collection.slug', 'in', input.slugs)
    .where('language_string_collection.user__id', '=', userId)
    .execute()

  const stringItems = await db
    .selectFrom('language_string_collection_item')
    .selectAll()
    .innerJoin(
      'language_string_collection',
      'language_string_collection_item.collection__id',
      'language_string_collection.id',
    )
    .where('language_string_collection.slug', 'in', input.slugs)
    .where('language_string_collection.user__id', '=', userId)
    .execute()

  const stringCollections = await db
    .selectFrom('language_string_collection')
    .selectAll()
    .where('slug', 'in', input.slugs)
    .where('user__id', '=', userId)
    .execute()

  const stringsData = await resolveLanguageStrings(strings, {
    pronunciations: true,
    transcriptions: true,
    definitions: true,
  })

  const output: any = {
    language_string_collections: stringCollections.map(x => ({
      id: intToIdTone(x.id),
      slug: x.slug,
      items: stringItems.map(x => ({ id: bigintToIdTone(x.id) })),
    })),
    language_string_collection_items: stringItems.map(x => ({
      id: bigintToIdTone(x.id),
      slug: x.slug,
    })),
    ...stringsData,
  }

  return removeNulls(output)
}
