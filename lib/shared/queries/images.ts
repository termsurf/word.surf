import z from 'zod'

export const FileNode = z.object({
  slug: z.string(),
  record: z.optional(
    z.lazy(() => z.union([ImageItem, VideoItem, DocumentItem])),
  ),
  children: z.lazy(() => FileNode),
})

export type FileNode = z.infer<typeof FileNode>

export const ImageItem = z.object({
  type: z.enum(['image']),
  path: z.string(),
})

export type ImageItem = z.infer<typeof ImageItem>

export const VideoItem = z.object({
  type: z.enum(['video']),
  path: z.string(),
})

export type VideoItem = z.infer<typeof VideoItem>

export const DocumentItem = z.object({
  type: z.enum(['document']),
  path: z.string(),
})

export type DocumentItem = z.infer<typeof DocumentItem>

export type Image = {
  id: string
  path: string
  preview?: string
  title?: string
  files: Array<ImageFile>
}

export type ImageFile = {
  id: string
  url: string
  format?: string
  width: number
  height: number
  size?: string
}
