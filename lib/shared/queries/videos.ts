export type Video = {
  id: string
  path: string
  title?: string
  files: Array<VideoFile>
}

export type VideoFile = {
  id: string
  url: string
  format?: string
  length?: number
  width?: number
  height?: number
}
