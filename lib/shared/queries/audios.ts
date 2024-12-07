export type Audio = {
  id: string
  path: string
  title?: string
  files: Array<AudioFile>
}

export type AudioFile = {
  id: string
  url: string
  format?: string
  length?: number
}
