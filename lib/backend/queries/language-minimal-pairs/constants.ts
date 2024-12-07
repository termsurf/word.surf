import { z } from 'zod'
import { pagination } from '~/lib/shared/utilities/schema'

export const ListLanguageMinimalPairs = z.object({
  ...pagination(),
  languageId: z.number().int(),
})

export type ListLanguageMinimalPairs = z.infer<
  typeof ListLanguageMinimalPairs
>
