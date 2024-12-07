export type List<T> = {
  size: number
  list: Array<T>
}

export type Language = {
  id: string
  slug: string
  name: string
}

export type LanguageItem = {
  id: string
  slug: string
  name: string
}

export type LanguageListItem = {
  id: string
  position: number
  translations: Array<{
    language: {
      id: string
    }
    components: Array<{
      id: string
      role?: string
      text: string
      context?: {
        id: string
        text: string
      }
    }>
  }>
}

export type LanguageComponentItem = {
  id: string
  text: string
  role?: string
  is_syllable?: boolean
  transcriptions: Array<{
    id: string
    text: string
    // position: number
  }>
  pronunciations: Array<{
    id: string
    position: number
    text: string
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
      format?: string
      width: number
      height: number
      size?: string
    }>
  }
}

export type ImageAssetMap = Record<string, ImageAsset>

export type LanguageMinimalPair = {
  id: string
  language: {
    id: string
  }
  source: {
    id: string
  }
  target: {
    id: string
  }
  difference: number
}

export type LanguageMinimalPairList = {
  id: string
  language: {
    id: string
  }
}

export type LanguageMinimalPairListItem = {
  id: string
  list: {
    id: string
  }
  pair: {
    id: string
  }
  position: number
}

export type LanguageString = {
  id: string
  text: string
  role: string
  context?: {
    id: string
    text: string
  }
  language: {
    id: string
  }
  transcriptions?: Array<{
    id: string
    text: string
    script?: {
      id: string
    }
    scheme?: {
      id: string
    }
  }>
  pronunciations?: Array<{
    id: string
    position: number
    talk: string
    ipa: string
    xsampa: string
    accent?: {
      id: string
    }
    script?: {
      id: string
    }
    scheme?: {
      id: string
    }
  }>
  definitions?: Array<{
    id: string
    text: string
    position: number
  }>
  examples?: Array<{
    id: string
    text: string
    position: number
  }>
  affix?: string
  animacy?: string
  arity?: number
  aspect?: string
  beneficiary?: string
  case?: string
  category?: string
  class?: string
  concreteness?: string
  continuity?: string
  countability?: string
  declension?: number
  definiteness?: string
  directionality?: string
  etymology?: string
  finiteness?: string
  focus?: string
  formality?: string
  frequency?: number
  gender?: string
  group?: string
  has_predictable_meaning?: boolean
  head?: {
    id: string
  }
  inclusivity?: string
  is_affix?: boolean
  is_alternative?: boolean
  is_auxiliary?: boolean
  is_base?: boolean
  is_borrowed?: boolean
  is_compound?: boolean
  is_derived?: boolean
  is_descendent?: boolean
  is_form?: boolean
  is_head?: boolean
  is_inflection?: boolean
  is_lead?: boolean
  is_modal?: boolean
  is_multi_word?: boolean
  is_norm?: boolean
  is_phrase?: boolean
  is_prefix?: boolean
  is_proper?: boolean
  is_root?: boolean
  is_suffix?: boolean
  is_syllable?: boolean
  is_term?: boolean
  is_terminating?: boolean
  is_translation?: boolean
  is_variant?: boolean
  is_word?: boolean
  likelihood?: string
  mood?: string
  mutation?: boolean
  origin?: {
    id: string
  }
  person?: number
  plurality?: string
  polarity?: string
  possessivity?: string
  rationality?: string
  regularity?: string
  relativity?: string
  respect?: string
  root?: {
    id: string
  }
  specificity?: string
  structure?: string
  syllable__max?: number
  syllable__min?: number
  tense?: string
  transitivity?: string
  updated_at?: string
  voice?: string
}
