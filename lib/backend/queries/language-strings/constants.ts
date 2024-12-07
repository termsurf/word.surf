import { z } from 'zod'
import { pagination } from '~/lib/shared/utilities/schema'

export const GetLanguageStringsByLanguageId = z.object({
  ...pagination(),
  languageId: z.number().int(),
})

export type GetLanguageStringsByLanguageId = z.infer<
  typeof GetLanguageStringsByLanguageId
>

export const GetLanguageString = z.object({
  language: z.object({ slug: z.string() }),
  string: z.object({ text: z.string() }),
})

export type GetLanguageString = z.infer<typeof GetLanguageString>

export const SearchLanguageStringsByPronunciation = z.object({
  languageId: z.number().int(),
  text: z.string(),
  ...pagination(),
})

export type SearchLanguageStringsByPronunciation = z.infer<
  typeof SearchLanguageStringsByPronunciation
>
