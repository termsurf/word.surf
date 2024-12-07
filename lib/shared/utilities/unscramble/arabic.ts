import { WordListMap } from '.'
import { removeArabicDiacritics } from '../unicode'

export function createArabicWordMap(dictionary: Array<string>) {
  const map: WordListMap = new Map<string, Set<string>>()

  for (const word of dictionary) {
    const base = removeArabicDiacritics(word)
    const set = map.get(base) ?? new Set<string>()
    set.add(word)
    map.set(base, set)
  }

  return map
}
