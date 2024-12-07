import { z } from 'zod'
import { pagination } from '~/lib/shared/utilities/schema'

export const SearchAnagrams = z.object({
  ...pagination(),
  languageId: z.number().int(),
  scriptId: z.number().int(),
  text: z.string(),
})

export type SearchAnagrams = z.infer<typeof SearchAnagrams>
