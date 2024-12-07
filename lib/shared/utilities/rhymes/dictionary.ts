export type Word = string
export type Syllable = string
export type SyllableSequence = Syllable[]
export type ConsonantSimilarity = Map<string, Map<string, number>>

interface RhymeResult {
  word: Word
  similarity: number
}

export class RhymeDictionary {
  private wordToSyllables: Map<Word, SyllableSequence>
  private consonantSimilarity: ConsonantSimilarity

  constructor(consonantSimilarity: ConsonantSimilarity) {
    this.wordToSyllables = new Map()
    this.consonantSimilarity = consonantSimilarity
  }

  /**
   * Insert a word and its syllable sequence into the dictionary
   */
  insert(word: Word, syllables: SyllableSequence): void {
    this.wordToSyllables.set(word, syllables)
  }

  /**
   * Search for rhyming words
   */
  search(word: Word, minSimilarity = 0.1): RhymeResult[] {
    const syllables = this.wordToSyllables.get(word)
    if (!syllables) {
      return []
    }

    const results: RhymeResult[] = []

    // Compare with all other words in the dictionary
    for (const [
      candidateWord,
      candidateSyllables,
    ] of this.wordToSyllables.entries()) {
      if (candidateWord !== word) {
        const similarity = this.calculateRhymeSimilarity(
          syllables,
          candidateSyllables,
        )
        if (similarity >= minSimilarity) {
          results.push({ word: candidateWord, similarity })
        }
      }
    }

    // Sort by similarity score in descending order
    return results.sort((a, b) => b.similarity - a.similarity)
  }

  /**
   * Calculate rhyme similarity between two syllable sequences
   */
  private calculateRhymeSimilarity(
    syllables1: SyllableSequence,
    syllables2: SyllableSequence,
  ): number {
    // Focus more on the end syllables for rhyming
    const len1 = syllables1.length
    const len2 = syllables2.length
    const maxLength = Math.max(len1, len2)

    let totalSimilarity = 0
    let weightSum = 0

    // Compare syllables from the end, with higher weights for later syllables
    for (let i = 0; i < maxLength; i++) {
      const syllable1 = syllables1[len1 - 1 - i]
      const syllable2 = syllables2[len2 - 1 - i]

      if (!syllable1 || !syllable2) break

      // Weight increases for syllables closer to the end
      const weight = Math.pow(2, i)
      weightSum += weight

      const syllableSimilarity = this.calculateSyllableSimilarity(
        syllable1,
        syllable2,
      )
      totalSimilarity += syllableSimilarity * weight
    }

    return totalSimilarity / weightSum
  }

  /**
   * Calculate similarity between two syllables using consonant similarity map
   */
  private calculateSyllableSimilarity(
    syllable1: Syllable,
    syllable2: Syllable,
  ): number {
    // Simple consonant comparison for now - could be extended for vowels
    const consonant1 = this.extractConsonant(syllable1)
    const consonant2 = this.extractConsonant(syllable2)

    if (consonant1 === consonant2) return 1

    const similarity = this.getConsonantSimilarity(
      consonant1,
      consonant2,
    )
    return similarity
  }

  /**
   * Extract the consonant part from a syllable
   */
  private extractConsonant(syllable: Syllable): string {
    // Simplified: assume consonants are at the start
    // Could be made more sophisticated for different syllable patterns
    const consonantMatch = syllable.match(/^[^aeiou]+/i)
    return consonantMatch ? consonantMatch[0] : ''
  }

  /**
   * Get similarity between two consonants from the similarity map
   */
  private getConsonantSimilarity(c1: string, c2: string): number {
    if (!c1 || !c2) return 0
    const similarityMap = this.consonantSimilarity.get(c1)
    if (!similarityMap) return 0
    return similarityMap.get(c2) ?? 0
  }
}

// Example usage:
/*
const consonantSimilarity = new Map<string, Map<string, number>>();
const pSimilarities = new Map<string, number>();
pSimilarities.set('b', 0.8);
pSimilarities.set('f', 0.3);
consonantSimilarity.set('p', pSimilarities);

const dictionary = new RhymeDictionary(consonantSimilarity);
dictionary.insert('happy', ['hae', 'pi']);
dictionary.insert('sappy', ['sae', 'pi']);

const results = dictionary.search('happy');
*/
