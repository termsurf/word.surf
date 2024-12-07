import { z } from 'zod'
import { pagination } from '~/lib/shared/utilities/schema'

export const ListVideoCollections = z.object({
  ...pagination(),
  userId: z.string(),
})

export type ListVideoCollections = z.infer<typeof ListVideoCollections>

export const FindVideoCollections = z.object({
  paths: z.array(z.string()),
})

export type FindVideoCollections = z.infer<typeof FindVideoCollections>

export const CreateVideoCollection = z.object({
  path: z.string(),
})

export type CreateVideoCollection = z.infer<
  typeof CreateVideoCollection
>
