import { z } from 'zod'
import { pagination } from '~/lib/shared/utilities/schema'

export const ListLanguages = z.object({
  category: z.union([z.string(), z.array(z.string())]).optional(),
  ...pagination(),
})

export type ListLanguages = z.infer<typeof ListLanguages>

export const FindLanguage = z.object({
  slug: z.string().optional(),
  id: z.string().optional(),
})

export type FindLanguage = z.infer<typeof FindLanguage>

export const CreateLanguage = z.object({
  slug: z.string(),
  name: z.string(),
  iso639_1: z.string().optional(),
  iso639_2: z.string().optional(),
  iso639_3: z.string().optional(),
  category: z.string().optional(),
  is_natural: z.boolean().optional(),
  is_constructed: z.boolean().optional(),
})

export type CreateLanguage = z.infer<typeof CreateLanguage>

export const UpdateLanguage = z.object({
  id: z.number().int(),
  slug: z.string().optional(),
  name: z.string().optional(),
  iso639_1: z.string().optional(),
  iso639_2: z.string().optional(),
  iso639_3: z.string().optional(),
  category: z.string().optional(),
  is_natural: z.boolean().optional(),
  is_constructed: z.boolean().optional(),
})

export type UpdateLanguage = z.infer<typeof UpdateLanguage>

export const GetLanguageId = z.object({
  key: z.string(),
})

export type GetLanguageId = z.infer<typeof GetLanguageId>
