import { z } from 'zod'
import { pagination } from '~/lib/shared/utilities/schema'

export const GetLanguagePages = z.object({
  ...pagination(),
  languageKey: z.string(),
  slugs: z.array(z.string()).optional(),
})

export type GetLanguagePages = z.infer<typeof GetLanguagePages>

export const GetLanguagePage = z.object({
  language: z.string(),
  path: z.string(),
})

export type GetLanguagePage = z.infer<typeof GetLanguagePage>

export const UpdateLanguagePage = z.object({
  language: z.string(),
  key: z.string(),
})

export type UpdateLanguagePage = z.infer<typeof UpdateLanguagePage>
