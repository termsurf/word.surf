import { z } from 'zod'
import { pagination } from '~/lib/shared/utilities/schema'

export const ListImageCollections = z.object({
  ...pagination(),
  userId: z.string(),
})

export type ListImageCollections = z.infer<typeof ListImageCollections>

export const FindImageCollectionsBySlugs = z.object({
  paths: z.array(z.string()),
})

export type FindImageCollectionsBySlugs = z.infer<
  typeof FindImageCollectionsBySlugs
>

export const CreateImageCollection = z.object({
  userKey: z.string(),
  path: z.string(),
})

export type CreateImageCollection = z.infer<
  typeof CreateImageCollection
>
