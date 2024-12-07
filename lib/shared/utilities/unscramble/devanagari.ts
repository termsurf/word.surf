import { WordListMap } from '.'
import { keepDevanagariConsonants } from '../unicode'

export function createDevanagariWordMap(dictionary: Array<string>) {
  const map: WordListMap = new Map<string, Set<string>>()

  for (const word of dictionary) {
    const base = keepDevanagariConsonants(word)
    const set = map.get(base) ?? new Set<string>()
    set.add(word)
    map.set(base, set)
  }

  return map
}
