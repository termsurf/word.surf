import { z } from 'zod'
import { pagination } from '~/lib/shared/utilities/schema'

export const ListRecordingCollections = z.object({
  ...pagination(),
  userId: z.string(),
})

export type ListRecordingCollections = z.infer<
  typeof ListRecordingCollections
>

export const FindRecordingCollections = z.object({
  paths: z.array(z.string()),
})

export type FindRecordingCollections = z.infer<
  typeof FindRecordingCollections
>

export const CreateRecordingCollection = z.object({
  path: z.string(),
})

export type CreateRecordingCollection = z.infer<
  typeof CreateRecordingCollection
>
