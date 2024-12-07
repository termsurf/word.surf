import { generateEmbedding } from '~/lib/backend/services/xenova/embeddings'
import { db, sql } from '~/lib/shared/utilities/kysely'
import {
  InsertLanguageDefinitionEmbedding,
  SearchSimilarStringsBySemantics,
} from './constants'

export async function insertLanguageDefinitionEmbedding(
  source: InsertLanguageDefinitionEmbedding,
) {
  const input = InsertLanguageDefinitionEmbedding.parse(source)
  const embedding = await generateEmbedding(input.definitions.join(' '))

  return await db
    .insertInto('language_definition_embedding')
    .values({
      language__id: input.languageId,
      string__id: input.stringId,
      data: sql`${JSON.stringify(embedding)}::vector`,
    })
    .returning('id')
    .executeTakeFirst()
}

export async function searchSimilarLanguageStringsBySemantics(
  source: SearchSimilarStringsBySemantics,
) {
  const input = SearchSimilarStringsBySemantics.parse(source)
  const searchEmbedding = await generateEmbedding(input.search)

  return await db
    .selectFrom('language_definition_embedding')
    .select([
      'id',
      'string__id',
      sql<number>`1 - (data <=> ${JSON.stringify(
        searchEmbedding,
      )}::vector)`.as('similarity'),
    ])
    .where('language__id', '=', input.languageId)
    .orderBy(sql`data <=> ${JSON.stringify(searchEmbedding)}::vector`)
    .limit(input.size!)
    .offset((input.page! - 1) * input.size!)
    .execute()
}
