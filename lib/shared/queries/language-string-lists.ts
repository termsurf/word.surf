import z from 'zod'
import { paginationProps } from '~/lib/shared/queries'
import { List } from '../constants'
import { Image } from './images'
import { LanguageStringImage } from './language-string-images'
import { AbbreviatedLanguageString } from './language-strings'

export const GetLanguageStringLists = z.object({
  ...paginationProps(),
  languageId: z.string(),
})

export type GetLanguageStringLists = z.infer<
  typeof GetLanguageStringLists
>

export type GetLanguageStringListsResponse = {
  lists: List<GetLanguageStringListsResponseList>
}

export type GetLanguageStringListsResponseList = {
  id: string
  path: string
  size?: 'large' | 'medium' | 'small'
}

export const GetLanguageStringList = z.object({
  path: z.string(),
  languageId: z.string(),
})

export type GetLanguageStringList = z.infer<
  typeof GetLanguageStringList
>

export type GetLanguageStringListResponse = {
  lists: List<GetLanguageStringListResponseList>
  string_images?: List<LanguageStringImage>
  images?: List<Image>
}

export type GetLanguageStringListQueryParams = {
  languageSlug: string
  listPath: string
}

export type GetLanguageStringListResponseList = {
  id: string
  path: string
  size?: 'large' | 'medium' | 'small'
  items: Array<GetLanguageStringListResponseListItem>
}

export type GetLanguageStringListResponseListItem = {
  id: string
  position: number
  string: AbbreviatedLanguageString
}
