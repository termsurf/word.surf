export type Language = {
  id: string
  slug: string
  name: string
}

export type LanguageComponentItem = {
  id: string
  slug: string
  expressions: Array<{
    id: string
    slug: string
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
      position: number
    }>
  }>
}
