import { z } from 'zod'
import { pagination } from '~/lib/shared/utilities/schema'

export const SearchSynonyms = z.object({
  ...pagination(),
  languageId: z.number().int(),
  scriptId: z.number().int(),
  text: z.string(),
})

export type SearchSynonyms = z.infer<typeof SearchSynonyms>
