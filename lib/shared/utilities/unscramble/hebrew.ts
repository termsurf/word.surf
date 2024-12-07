import { WordListMap } from '.'
import { removeHebrewNiqqud } from '../unicode'

export function createHebrewWordMap(dictionary: Array<string>) {
  const map: WordListMap = new Map<string, Set<string>>()

  for (const word of dictionary) {
    const base = removeHebrewNiqqud(word)
    const set = map.get(base) ?? new Set<string>()
    set.add(word)
    map.set(base, set)
  }

  return map
}
