import * as devanagari from '@termsurf/text/devanagari'

const consonants = devanagari.consonants.reduce((m, x) => {
  m[x.text] = true
  return m
}, {})

export function removeArabicDiacritics(text: string) {
  return text.replace(
    /([^\u0621-\u063A\u0641-\u064A\u0660-\u0669a-zA-Z 0-9])/g,
    '',
  )
}

export function removeHebrewNiqqud(text: string) {
  return text.replace(/([\u05B0-\u05BD]|[\u05BF-\u05C7])/g, '')
}

export function keepDevanagariConsonants(text: string) {
  return [...text].filter(glyph => glyph in consonants).join('')
}
