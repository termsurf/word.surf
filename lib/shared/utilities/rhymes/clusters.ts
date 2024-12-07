// TODO: build the list of possible vowels and
// consonant clusters from Wiktionary and other IPA sources.
import {
  consonants as _consonants,
  endConsonants as _endConsonants,
  fullConsonants as _fullConsonants,
  startConsonants as _startConsonants,
  vowels as _vowels,
} from '@termsurf/talk/make/talk/syllables'
import uniq from 'lodash/uniq'

export const consonants = _consonants.map(key => key.replace(/:/g, ''))
export const endConsonants = _endConsonants.map(key =>
  key.replace(/:/g, ''),
)
export const fullConsonants = _fullConsonants.map(key =>
  key.replace(/:/g, ''),
)
export const startConsonants = _startConsonants.map(key =>
  key.replace(/:/g, ''),
)
export const vowels = _vowels.map(key => key.replace(/:/g, ''))

export const consonantClusters = uniq([
  ...startConsonants,
  ...fullConsonants,
  ...endConsonants,
]).map(text => text.split(''))
