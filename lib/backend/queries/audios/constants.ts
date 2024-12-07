import { z } from 'zod'
import { pagination } from '~/lib/shared/utilities/schema'

export const ListRecordings = z.object({
  ...pagination(),
  paths: z.array(z.string()).optional(),
  ids: z.array(z.string()).optional(),
})

export type ListRecordings = z.infer<typeof ListRecordings>

export const ListRecordingsByPaths = z.object({
  ...pagination(),
  paths: z.array(z.string()),
})

export type ListRecordingsByPaths = z.infer<
  typeof ListRecordingsByPaths
>

export const ListRecordingsByIds = z.object({
  ...pagination(),
  paths: z.array(z.string()),
})

export type ListRecordingsByIds = z.infer<typeof ListRecordingsByIds>

export const ListRecordingsGlobally = z.object({
  ...pagination(),
})

export type ListRecordingsGlobally = z.infer<
  typeof ListRecordingsGlobally
>

export const UploadRecording = z.object({
  path: z.string(),
  localPath: z.string(),
})

export type UploadRecording = z.infer<typeof UploadRecording>

export const FORMAT = {
  mp3: 'mp3',
}

export const MIME = {
  mp3: 'audio/mpeg',
}
