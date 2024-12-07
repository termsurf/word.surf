import z from 'zod'
import { paginationProps } from '~/lib/shared/queries'
import { List } from '../constants'
import { LanguageCollaborator } from './language-collaborators'

export const GetLanguages = z.object({
  ...paginationProps(),
  categories: z.array(z.string()).optional(),
})

export type GetLanguages = z.infer<typeof GetLanguages>

export type GetLanguagesResponse = {
  languages: List<AbbreviatedLanguage>
}

export type AbbreviatedLanguage = {
  id: string
  slug: string
  name: string
}

export type GetLanguageResponse = {
  languages: List<GetLanguageResponseLanguage>
  collaborators: List<LanguageCollaborator>
}

export type GetLanguageQueryParams = {
  slug: string
  roles?: Array<string>
  isHead?: boolean
}

export type GetLanguageResponseLanguage = {
  id: string
  slug: string
  name: string
  is_natural?: boolean
  is_constructed?: boolean
}

export const NewLanguage = z.object({
  name: z.string().optional(),
  slug: z.string().optional(),
  is_constructed: z.boolean().optional(),
})

export type NewLanguage = z.infer<typeof NewLanguage>

export const CreateLanguage = z.object({
  name: z.string(),
  slug: z.string(),
  is_constructed: z.boolean().optional(),
})

export type CreateLanguage = z.infer<typeof CreateLanguage>

export type CreateLanguageResponse = {
  languages: List<AbbreviatedLanguage>
}
