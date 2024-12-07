import z from 'zod'
import { paginationProps } from '~/lib/shared/queries'
import { List } from '../constants'
import { Image } from './images'
import { LanguageCollaborator } from './language-collaborators'
import { LanguageStringImage } from './language-string-images'
import { AbbreviatedLanguage } from './languages'
import { AbbreviatedScript } from './scripts'

export const GetLanguageStrings = z.object({
  ...paginationProps(),
  language: z.string(),
  roles: z.optional(z.array(z.string())),
  isHead: z.optional(z.boolean()),
})

export type GetLanguageStrings = z.infer<typeof GetLanguageStrings>

export type GetLanguageStringsResponse = {
  scripts: List<AbbreviatedScript>
  languages: List<AbbreviatedLanguage>
  strings: List<AbbreviatedLanguageString>
  images?: List<Image>
  string_images?: List<LanguageStringImage>
}

export type GetLanguageStringsQueryParams = {
  languageSlug: string
}

export type AbbreviatedLanguageString = {
  id: string
  text: string
  role: string
  context?: {
    id: string
    text: string
  }
  pronunciations: Array<AbbreviatedLanguagePronunciation>
  transcriptions: Array<AbbreviatedLanguageTranscription>
}

export type AbbreviatedLanguagePronunciation = {
  id: string
  talk: string
  ipa: string
  xsampa: string
}

export type AbbreviatedLanguageTranscription = {
  id: string
  text: string
}

export const GetLanguageString = z.object({
  language: z.string(),
  role: z.optional(z.string()),
  context: z.optional(z.string()),
})

export type GetLanguageString = z.infer<typeof GetLanguageString>

export const GetLanguageStringInflections = z.object({
  language: z.string(),
  role: z.optional(z.string()),
  context: z.optional(z.string()),
})

export type GetLanguageStringInflections = z.infer<
  typeof GetLanguageStringInflections
>

export type GetLanguageStringResponse = {
  scripts: List<AbbreviatedScript>
  languages: List<AbbreviatedLanguage>
  strings: List<LanguageString>
  images?: List<Image>
  string_images?: List<LanguageStringImage>
}

export type GetLanguageStringQueryParams = {
  languageSlug: string
  stringSlug: string
}

export type GetLanguageStringAnagramsResponse = {
  scripts: List<AbbreviatedScript>
  languages: List<AbbreviatedLanguage>
  strings: List<LanguageStringForInflection>
}

export type GetLanguageStringInflectionsResponse = {
  scripts: List<AbbreviatedScript>
  languages: List<AbbreviatedLanguage>
  strings: List<LanguageStringForInflection>
}

export type LanguageString = {
  affix?: string
  animacy?: string
  arity?: number
  aspect?: string
  beneficiary?: string
  case?: string
  category?: string
  class?: string
  concreteness?: string
  has_inflections?: boolean
  context?: {
    id: string
  }
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
  id: string
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
  language: {
    id: string
  }
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
  role?: string
  root?: {
    id: string
  }
  specificity?: string
  structure?: string
  syllable?: {
    max: number
    min: number
  }
  tense?: string
  text: string
  transitivity?: string
  updated_at?: string
  voice?: string
  pronunciations: Array<LanguagePronunciation>
  transcriptions: Array<LanguageTranscription>
  definitions: Array<LanguageDefinition>
  examples: Array<LanguageExample>
  collaborators: List<LanguageCollaborator>
}

export type LanguageStringForInflection = {
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
  gender?: string
  group?: string
  id: string
  inclusivity?: string
  likelihood?: string
  mood?: string
  mutation?: boolean
  person?: number
  plurality?: string
  polarity?: string
  possessivity?: string
  rationality?: string
  regularity?: string
  relativity?: string
  respect?: string
  role?: string
  specificity?: string
  structure?: string
  tense?: string
  text: string
  transitivity?: string
  voice?: string
  pronunciations: Array<LanguagePronunciation>
  transcriptions: Array<LanguageTranscription>
  collaborators: List<LanguageCollaborator>
}

export type LanguagePronunciation = {
  id: string
  accent?: {
    id: string
  }
  ipa: string
  is_canonical?: boolean
  pattern?: string
  pattern_simplified?: string
  position: number
  scheme?: {
    id: string
  }
  script?: {
    id: string
  }
  source?: string
  syllables?: {
    count: number
    spans: Array<string>
  }
  talk: string
  updated_at?: string
  xsampa: string
  recordings: Array<LanguagePronunciationRecording>
}

export type LanguagePronunciationRecording = {
  id: string
  accent?: {
    id: string
  }
  file?: {
    id: string
  }
  gender?: string
  language: {
    id: string
  }
  position?: number
  provider?: string
  system?: string
  text: string
}

export type LanguageTranscription = {
  id: string
  is_canonical?: boolean
  is_phonetic?: boolean
  is_uppercase?: boolean
  length: number
  scheme?: {
    id: string
  }
  script?: {
    id: string
  }
  source?: string
  text: string
  updated_at?: string
}

export type LanguageExample = {
  citation?: {
    id: string
  }
  english_translation?: string
  id: string
  position: number
  provider?: string
  script?: {
    id: string
  }
  text: string
  updated_at?: string
}

export type LanguageDefinition = {
  citation?: {
    id: string
  }
  id: string
  position: number
  provider?: string
  system?: string
  // 'archaic'
  // 'cleaned'
  // 'colloquial'
  // 'dated'
  // 'dialectal'
  // 'euphemistic'
  // 'figurative'
  // 'formal'
  // 'gloss'
  // 'historical'
  // 'idiomatic'
  // 'intransitive'
  // 'literally'
  // 'literary'
  // 'medieval'
  // 'military'
  // 'neologism'
  // 'obsolete'
  // 'slang'
  // 'summary'
  // 'transitive'
  // 'vulgar'
  tags?: string[]
  text?: string
  updated_at?: string
}
