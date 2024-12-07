export type WordListMap = Map<string, Set<string>>

export type UnscrambledTermBySizeType = Record<
  string,
  Record<string, boolean>
>

export type UnscrambledTermMapType = Record<
  string,
  Record<string, boolean>
>

export type UnscrambledTermAnagramTrieType = Record<
  string,
  Array<string>
>

export interface AnagramTrieNode {
  children: Map<string, AnagramTrieNode>
  words: Set<string> // Changed from array to Set for unique values
  count: number
}

export interface AnagramResult {
  combination: string
  anagrams: Array<string>
}

export class AnagramTrie implements AnagramTrieNode {
  children: Map<string, AnagramTrie>
  words: Set<string>
  count: number
  cache: Map<string, Set<string>> // Changed to cache Sets instead of Arrays

  constructor() {
    this.children = new Map()
    this.words = new Set()
    this.count = 0
    this.cache = new Map()
  }

  insert(word: string): void {
    if (!word) return
    const sortedChars: string = Array.from(word).sort().join('')
    this._insert(sortedChars, word)
  }

  private _insert(sortedKey: string, originalWord: string): void {
    this.count++

    if (sortedKey.length === 0) {
      this.words.add(originalWord)
      return
    }

    const firstChar: string = sortedKey[0]
    if (!this.children.has(firstChar)) {
      this.children.set(firstChar, new AnagramTrie())
    }

    this.children
      .get(firstChar)
      ?._insert(sortedKey.slice(1), originalWord)
  }

  findAnagrams(
    letters: string,
    maxResults: number = Infinity,
  ): Set<string> {
    if (!letters) return new Set<string>()

    const sortedChars: string = Array.from(letters).sort().join('')

    // Check if we have a cached result for these exact letters
    const cachedResult = this.cache.get(sortedChars)
    if (cachedResult) {
      const limitedResult = new Set(
        [...cachedResult].slice(0, maxResults),
      )
      limitedResult.delete(letters)
      return limitedResult
    }

    const resultSet = new Set<string>()
    this._findAnagrams(sortedChars, maxResults, resultSet)

    // Cache the complete result before applying limits
    this.cache.set(sortedChars, new Set(resultSet))

    resultSet.delete(letters)
    return resultSet
  }

  private _findAnagrams(
    sortedChars: string,
    maxResults: number,
    results: Set<string>,
  ): void {
    // Base case: empty string means we've used all characters
    if (sortedChars.length === 0) {
      for (const word of this.words) {
        results.add(word)
        if (results.size >= maxResults) return
      }
      return
    }

    // Check cache first
    const cached = this.cache.get(sortedChars)
    if (cached) {
      for (const word of cached) {
        results.add(word)
        if (results.size >= maxResults) return
      }
      return
    }

    // Create a temporary set for collecting results for this specific combination
    const tempResults = new Set<string>()

    // Character frequency counting
    const charFreq = new Map<string, number>()
    for (const char of sortedChars) {
      charFreq.set(char, (charFreq.get(char) || 0) + 1)
    }

    // Try each available character
    for (const [char, node] of this.children) {
      const charCount = charFreq.get(char)
      if (charCount && charCount > 0) {
        // Use the character
        charFreq.set(char, charCount - 1)

        // Create remaining characters string
        const remainingChars = Array.from(charFreq.entries())
          .flatMap(([c, count]) => Array(count).fill(c))
          .sort()
          .join('')

        // Recursive search
        node._findAnagrams(remainingChars, maxResults, tempResults)

        // Restore the character for backtracking
        charFreq.set(char, charCount)

        // Check if we've reached the limit
        if (tempResults.size >= maxResults) break
      }
    }

    // Cache results for this combination
    if (tempResults.size > 0) {
      this.cache.set(sortedChars, new Set(tempResults))
    }

    // Add all found results to the main results set
    for (const result of tempResults) {
      results.add(result)
      if (results.size >= maxResults) return
    }
  }

  // Optional: Add a method to clear the cache if needed
  clearCache(): void {
    this.cache.clear()
  }
}

type CombinationGenerator = Generator<Array<string>, void, unknown>

/**
 * Generates unique combinations of letters of a specified length
 * @param letters - Array of letters to generate combinations from
 * @param taken - Array of letters already selected for the current combination
 * @param length - Target length for combinations
 * @param startPos - Starting position in the letters array
 * @param seen - Set of already generated combinations
 */
function* generateCombosOfLength(
  letters: Array<string>,
  taken: Array<string>,
  length: number,
  startPos: number,
  seen: Set<string>,
): CombinationGenerator {
  // If we've reached the target length, check if this combination is unique
  if (taken.length === length) {
    const sortedCombo = [...taken].sort().join('')
    if (!seen.has(sortedCombo)) {
      seen.add(sortedCombo)
      yield taken
    }
    return
  }

  // Try adding each remaining letter to our combination
  for (let i = startPos; i < letters.length; i++) {
    yield* generateCombosOfLength(
      letters,
      [...taken, letters[i]],
      length,
      i + 1,
      seen,
    )
  }
}

/**
 * Generates all possible unique combinations of letters with length >= minLength
 * @param letters - Array of letters to generate combinations from
 * @param minLength - Minimum length of combinations to generate
 */
export function* generateCombinations(
  letters: Array<string>,
  minLength: number,
  maxLength: number,
): CombinationGenerator {
  const seen: Set<string> = new Set()

  const n = Math.min(maxLength, letters.length)

  // Generate combinations for each length from minLength up to letters.length
  for (let len = minLength; len <= n; len++) {
    yield* generateCombosOfLength(letters, [], len, 0, seen)
  }
}

/**
 * Find all possible unique anagrams for a given word using a dictionary
 */
export function findAnagramsForWord(
  trie: AnagramTrie,
  word: string,
  minLength: number = 3,
  maxLength: number = 10,
): WordListMap {
  const results: WordListMap = new Map()
  const letters: Array<string> = Array.from(word)

  // Generate all possible letter combinations
  for (const combo of generateCombinations(
    letters,
    minLength,
    maxLength,
  )) {
    const anagrams = trie.findAnagrams(combo.join(''))
    if (anagrams.size > 0) {
      results.set(combo.join(''), anagrams)
    }
  }

  return results
}

export function convertAnagramsToJSON(
  results: WordListMap,
): Array<AnagramResult> {
  return Array.from(results.entries()).map(
    ([combination, anagrams]) => ({
      combination,
      anagrams: [...anagrams],
    }),
  )
}

export function createAnagramTrie(dictionary: Array<string>) {
  // Create and populate the trie with dictionary words
  const trie = new AnagramTrie()
  // Remove duplicates from dictionary before insertion
  Array.from(new Set(dictionary)).forEach(term => trie.insert(term))
  return trie
}

export function findAnagramsForWordSubset({
  trie,
  word,
  minLength = 2,
  maxLength = 10,
  map,
}: {
  trie: AnagramTrie
  word: string
  minLength?: number
  maxLength?: number
  map: WordListMap
}): WordListMap {
  const results: WordListMap = findAnagramsForWord(
    trie,
    word,
    minLength,
    maxLength,
  )

  for (const key of results.keys()) {
    const values = results.get(key)!
    const entries = [...values]
    for (const value of entries) {
      const set = map.get(value)
      if (!set) {
        continue
      }
      const list = [...set]
      for (const word of list) {
        values.add(word)
      }
    }
  }

  return results
}

export function unfoldUnscrambled(
  term: string,
  map: UnscrambledTermMapType,
  trie: UnscrambledTermAnagramTrieType,
) {
  const symbols = [...term]
  const bySize: UnscrambledTermBySizeType = {}
  const start = map[symbols.sort().join('')]
  const queue: Array<string> = []
  const traversed: Record<string, boolean> = {}

  let size = symbols.length

  bySize[size] = {}
  bySize[size][term] = true

  for (const b in start) {
    queue.push(b)
  }

  while (queue.length) {
    const sortedTerm = queue.shift() ?? ''
    if (traversed[sortedTerm]) {
      continue
    }

    traversed[sortedTerm] = true

    const matchedTerms = trie[sortedTerm] ?? []

    matchedTerms.forEach(term => {
      const symbols = [...term]
      const size = symbols.length
      bySize[size] ??= {}
      bySize[size][term] = true

      const sortedInputTerm = symbols.sort().join('')
      const next = map[sortedInputTerm]

      for (const b in next) {
        queue.push(b)
      }
    })
  }

  return bySize
}
