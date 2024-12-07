import { z } from 'zod'
import { pagination } from '~/lib/shared/utilities/schema'

export const SearchRhymes = z.object({
  ...pagination(),
  languageId: z.number().int(),
  scriptId: z.number().int(),
  text: z.string(),
})

export type SearchRhymes = z.infer<typeof SearchRhymes>
