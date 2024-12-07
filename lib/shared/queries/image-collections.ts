import z from 'zod'

export const CreateImageCollectionItem = z.object({
  slug: z.string(),
})

export const CreateImageCollection = z.object({
  user: z.string(),
  path: z.string(),
  items: z.array(CreateImageCollectionItem),
})

export type CreateImageCollection = z.infer<
  typeof CreateImageCollection
>

export const UpdateImageCollection = z.object({
  user: z.string(),
  path: z.string(),
  items: z.array(CreateImageCollectionItem),
})

export type UpdateImageCollection = z.infer<
  typeof UpdateImageCollection
>

export type ImageCollectionItem = {
  id: string
  slug: string
  image: {
    id: string
  }
}
