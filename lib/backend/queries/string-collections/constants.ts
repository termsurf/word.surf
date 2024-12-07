import { z } from 'zod'
import { pagination } from '~/lib/shared/utilities/schema'

export const ListLanguageStringCollections = z.object({
  ...pagination(),
  userId: z.string(),
})

export type ListLanguageStringCollections = z.infer<
  typeof ListLanguageStringCollections
>

export const FindLanguageStringCollections = z.object({
  ...pagination(),
  slugs: z.array(z.string()),
})

export type FindLanguageStringCollections = z.infer<
  typeof FindLanguageStringCollections
>

export const ListLanguageStringsForCollectionSlugs = z.object({
  userKey: z.string(),
  slugs: z.array(z.string()),
})

export type ListLanguageStringsForCollectionSlugs = z.infer<
  typeof ListLanguageStringsForCollectionSlugs
>

export const CreateLanguageStringCollection = z.object({
  userKey: z.string(),
  slug: z.string(),
})

export type CreateLanguageStringCollection = z.infer<
  typeof CreateLanguageStringCollection
>
