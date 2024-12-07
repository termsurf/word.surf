import { z } from 'zod'
import { pagination } from '~/lib/shared/utilities/schema'

export const InsertLanguageDefinitionEmbedding = z.object({
  definitions: z.array(z.string()),
  languageId: z.number().int(),
  stringId: z.bigint(),
})

export type InsertLanguageDefinitionEmbedding = z.infer<
  typeof InsertLanguageDefinitionEmbedding
>

export const SearchSimilarStringsBySemantics = z.object({
  search: z.string(),
  languageId: z.number().int(),
  ...pagination(),
})

export type SearchSimilarStringsBySemantics = z.infer<
  typeof SearchSimilarStringsBySemantics
>
