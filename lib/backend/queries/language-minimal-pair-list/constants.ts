import { z } from 'zod'
import { pagination } from '~/lib/shared/utilities/schema'

export const ListLanguageMinimalPairLists = z.object({
  ...pagination(),
  languageId: z.number().int(),
})

export type ListLanguageMinimalPairLists = z.infer<
  typeof ListLanguageMinimalPairLists
>

export const FindLanguageMinimalPairList = z.object({
  ...pagination(),
  languageId: z.number().int(),
  path: z.string(),
})

export type FindLanguageMinimalPairList = z.infer<
  typeof ListLanguageMinimalPairLists
>
