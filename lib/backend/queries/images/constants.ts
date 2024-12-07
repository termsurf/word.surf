import { z } from 'zod'
import { pagination } from '~/lib/shared/utilities/schema'

export const ListImages = z.object({
  ...pagination(),
  paths: z.array(z.string()).optional(),
  ids: z.array(z.string()).optional(),
})

export type ListImages = z.infer<typeof ListImages>

export const ListImagesByPaths = z.object({
  ...pagination(),
  paths: z.array(z.string()),
})

export type ListImagesByPaths = z.infer<typeof ListImagesByPaths>

export const ListImagesByIds = z.object({
  ...pagination(),
  paths: z.array(z.string()),
})

export type ListImagesByIds = z.infer<typeof ListImagesByIds>

export const ListImagesGlobally = z.object({
  ...pagination(),
})

export type ListImagesGlobally = z.infer<typeof ListImagesGlobally>

export const UploadImageAsset = z.object({
  path: z.string(),
})

export type UploadImageAsset = z.infer<typeof UploadImageAsset>

export const FORMAT = {
  png: 'png',
  webp: 'webp',
  svg: 'svg',
}

export const MIME = {
  png: 'image/png',
  webp: 'image/webp',
}
