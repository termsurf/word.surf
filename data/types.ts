export type List<T> = {
  size: number
  list: Array<T>
}

export type Language = {
  id: string
  slug: string
  name: string
}

export type LanguageComponentItem = {
  id: string
  text: string
  role?: string
  is_syllable?: boolean
  expressions: Array<{
    id: string
    text: string
    role?: string
    context?: {
      id: string
    }
    transcriptions: Array<{
      id: string
      text: string
      position: number
    }>
    pronunciations: Array<{
      id: string
      text: string
    }>
  }>
  definitions: Array<{
    id: string
    text: string
    position: string
  }>
}

export type ImageAsset = {
  id: string
  path: string
  source: {
    id: string
    preview?: string
    title?: string
    files: Array<{
      id: string
      url: string
    }>
  }
}

export type ImageAssetMap = Record<string, ImageAsset>
