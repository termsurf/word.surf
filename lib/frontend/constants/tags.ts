export const TAG_TYPES = [
  'language',
  'script',
  'user',
  'language-string',
  'language-string-list',
  'language-string-role',
  'language-string-head',
  'page',
] as const

export type TagType = (typeof TAG_TYPES)[number]
