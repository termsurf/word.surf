import { z } from 'zod'
import { pagination } from '~/lib/shared/utilities/schema'

export const ListVideos = z.object({
  ...pagination(),
  paths: z.array(z.string()).optional(),
  ids: z.array(z.string()).optional(),
})

export type ListVideos = z.infer<typeof ListVideos>

export const ListVideosByPaths = z.object({
  ...pagination(),
  paths: z.array(z.string()),
})

export type ListVideosByPaths = z.infer<typeof ListVideosByPaths>

export const ListVideosByIds = z.object({
  ...pagination(),
  paths: z.array(z.string()),
})

export type ListVideosByIds = z.infer<typeof ListVideosByIds>

export const ListVideosGlobally = z.object({
  ...pagination(),
})

export type ListVideosGlobally = z.infer<typeof ListVideosGlobally>

export const UploadVideo = z.object({
  path: z.string(),
})

export type UploadVideo = z.infer<typeof UploadVideo>

export const FORMAT = {
  mp3: 'mp3',
}

export const MIME = {
  mp3: 'audio/mpeg',
}
