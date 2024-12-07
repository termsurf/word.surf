import { z } from 'zod'
import { List } from '../constants'
import { pagination } from '../utilities/schema'
import { AudioCollectionItem } from './audio-collections'
import { Audio } from './audios'
import { DocumentCollectionItem } from './document-collections'
import { Document } from './documents'
import { ImageCollectionItem } from './image-collections'
import { Image } from './images'
import { LanguageCollaborator } from './language-collaborators'
import { LanguageStringCollectionItem } from './language-string-collections'
import { AbbreviatedLanguageString } from './language-strings'
import { AbbreviatedLanguage } from './languages'
import { PageCollaborator } from './page-collaborators'
import { ScriptCollaborator } from './script-collaborators'
import { AbbreviatedScript } from './scripts'
import { VideosCollectionItem } from './video-collections'
import { Video } from './videos'

export const GetPages = z.object({
  ...pagination(),
})

export type GetPages = z.infer<typeof GetPages>

export const GetPage = z.object({
  path: z.string(),
  category: z.enum(['language-page', 'script-page']),
})

export type GetPage = z.infer<typeof GetPage>

export type GetPageResponse = {
  id: string
  pages: List<Page>
  images?: List<Image>
  audios?: List<Audio>
  videos?: List<Video>
  documents?: List<Document>
  strings?: List<AbbreviatedLanguageString>
  languages?: List<AbbreviatedLanguage>
  scripts?: List<AbbreviatedScript>
  collaborators: List<
    PageCollaborator | LanguageCollaborator | ScriptCollaborator
  >
}

export type GetPageQueryParams = {
  path: string
}

export const NewLanguagePage = z.object({
  language: z
    .object({
      id: z.string(),
    })
    .optional(),
  path: z.string().optional(),
  title: z.string().optional(),
  category: z.literal('language-page'),
  content: z.string().optional(),
})

export type NewLanguagePage = z.infer<typeof NewLanguagePage>

export const CreateLanguageDraft = z.object({
  language: z.object({
    id: z.string(),
  }),
  path: z.string(),
  title: z.string(),
  category: z.literal('language-page'),
  content: z.string().optional(),
})

export type CreateLanguageDraft = z.infer<typeof CreateLanguageDraft>

export type CreateLanguageDraftResponse = {
  languages: List<AbbreviatedLanguage>
  pages: List<Page>
}

export const PublishLanguageDraft = z.object({
  id: z.string(),
  is_published: z.literal(true),
})

export type PublishLanguageDraft = z.infer<typeof PublishLanguageDraft>

export type PublishLanguageDraftResponse = {
  languages: List<AbbreviatedLanguage>
  pages: List<Page>
}

export const UnpublishLanguagePage = z.object({
  id: z.string(),
  is_published: z.literal(false),
})

export type UnpublishLanguagePage = z.infer<
  typeof UnpublishLanguagePage
>

export type UnpublishLanguagePageResponse = {
  languages: List<AbbreviatedLanguage>
  pages: List<Page>
}

export const DeletePage = z.object({
  id: z.string(),
})

export type DeletePage = z.infer<typeof DeletePage>

export type DeletePageResponse = {
  pages: List<Page>
}

export const UndeletePage = z.object({
  id: z.string(),
})

export type UndeletePage = z.infer<typeof UndeletePage>

export type UndeletePageResponse = {
  pages: List<Page>
}

export const CreateScriptPage = z.object({
  script: z
    .object({
      id: z.string(),
    })
    .optional(),
  path: z.string(),
  title: z.string(),
  content: z.string().optional(),
})

export type CreateScriptPage = z.infer<typeof CreateScriptPage>

export const CreatePage = z.union([
  CreateLanguageDraft,
  CreateScriptPage,
])

export type CreatePage = z.infer<typeof CreatePage>

export const UpdatePage = z.object({
  id: z.string(),
  title: z.string().optional(),
  path: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  description: z.string().optional(),
  image: z.optional(
    z.object({
      id: z.string(),
    }),
  ),
  is_published: z.boolean().optional(),
})

export type UpdatePage = z.infer<typeof UpdatePage>

export type Page = {
  id: string
  title: string
  path: string
  keywords?: Array<string>
  description?: string
  image?: {
    id: string
  }
  is_published: boolean
  created_at: string
  published_at: string
  updated_at: string
  images?: Array<ImageCollectionItem>
  audios?: Array<AudioCollectionItem>
  documents?: Array<DocumentCollectionItem>
  videos?: Array<VideosCollectionItem>
  strings?: Array<LanguageStringCollectionItem>
  draft?: {
    id: string
  }
  live?: {
    id: string
  }
  category: string
  content: string
  metadata?: Record<string, any>
}
