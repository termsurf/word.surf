import { pipeline } from '@xenova/transformers'

interface WordSimilarity {
  word: string
  similarity: number // Changed to number explicitly
}

async function getRelatedWords(
  keyword: string,
  candidates: string[],
  similarityThreshold: number = 0.3,
): Promise<WordSimilarity[]> {
  try {
    const featureExtractor = await pipeline(
      'feature-extraction',
      'Xenova/all-distilroberta-v1',
    )

    // Contexts emphasizing natural/environmental relationships
    const contexts = [
      // Direct references
      word => `${word}`,
      word => `the ${word}`,

      // Categorical relationships
      word => `${word} is a type of`,
      word => `${word} belongs to`,
      word => `category of ${word}`,

      // Hierarchical/part-whole relationships
      word => `${word} is part of`,
      word => `${word} consists of`,
      word => `${word} contains`,

      // Location/spatial relationships
      word => `${word} exists in`,
      word => `${word} is found in`,
      word => `${word} lives in`,
      word => `habitat of ${word}`,

      // Interaction relationships
      word => `${word} interacts with`,
      word => `${word} relates to`,
      word => `${word} affects`,
      word => `${word} influences`,

      // Functional relationships
      word => `${word} serves to`,
      word => `${word} functions as`,
      word => `purpose of ${word}`,

      // System/domain contexts
      word => `${word} in nature`,
      word => `${word} in the ecosystem`,
      word => `${word} in the environment`,

      // Properties/characteristics
      word => `characteristics of ${word}`,
      word => `properties of ${word}`,
      word => `nature of ${word}`,

      // Role/behavior relationships
      word => `behavior of ${word}`,
      word => `role of ${word}`,
      word => `${word} typically`,

      // Group/collection relationships
      word => `group of ${word}`,
      word => `collection of ${word}`,
      word => `${word} among`,
    ]

    const getWordEmbeddings = async (word: string) => {
      return Promise.all(
        contexts.map(context => featureExtractor(context(word))),
      )
    }

    const keywordEmbeddings = await getWordEmbeddings(keyword)
    const candidateEmbeddings = await Promise.all(
      candidates.map(async word => ({
        word,
        embeddings: await getWordEmbeddings(word),
      })),
    )

    return calculateSimilarities(keywordEmbeddings, candidateEmbeddings)
  } catch (error) {
    console.error('Error in getRelatedWords:', error)
    throw error
  }
}

function getMeanEmbedding(tensor: any): Float32Array {
  const data = tensor.data
  const dims = tensor.dims

  if (dims.length === 3) {
    const [batchSize, seqLength, hiddenSize] = dims
    const result = new Float32Array(hiddenSize)
    let count = 0

    for (let i = 0; i < seqLength; i++) {
      for (let j = 0; j < hiddenSize; j++) {
        result[j] += data[i * hiddenSize + j]
        count++
      }
    }

    // Normalize by actual count
    for (let i = 0; i < result.length; i++) {
      result[i] = result[i] / count
    }

    return result
  }

  return new Float32Array(data)
}

function l2Normalize(vec: Float32Array): Float32Array {
  const norm = Math.sqrt(vec.reduce((sum, val) => sum + val * val, 0))
  if (norm === 0) return vec

  const normalized = new Float32Array(vec.length)
  for (let i = 0; i < vec.length; i++) {
    normalized[i] = vec[i] / norm
  }
  return normalized
}

function cosineSimilarity(
  vec1: Float32Array,
  vec2: Float32Array,
): number {
  if (vec1.length !== vec2.length) {
    throw new Error('Vectors must have the same length')
  }

  const normalizedVec1 = l2Normalize(vec1)
  const normalizedVec2 = l2Normalize(vec2)

  let dotProduct = 0
  for (let i = 0; i < normalizedVec1.length; i++) {
    dotProduct += normalizedVec1[i] * normalizedVec2[i]
  }

  // Scale from [-1, 1] to [0, 1]
  const rawSimilarity = (dotProduct + 1) / 2

  // Aggressive non-linear scaling
  const x = rawSimilarity - 0.5 // Center around 0
  const scaled = 1 / (1 + Math.exp(-15 * x)) // Steep sigmoid
  const boosted = Math.pow(scaled, 3) // Further separate high/low values

  return boosted
}

function calculateSimilarities(
  keywordEmbeddings: any[],
  candidates: { word: string; embeddings: any[] }[],
): WordSimilarity[] {
  const similarities: WordSimilarity[] = candidates.map(
    ({ word, embeddings }) => {
      let totalSim = 0
      let count = 0

      for (const keywordEmb of keywordEmbeddings) {
        for (const candidateEmb of embeddings) {
          const similarity = cosineSimilarity(
            getMeanEmbedding(keywordEmb),
            getMeanEmbedding(candidateEmb),
          )
          totalSim += similarity
          count++
        }
      }

      return {
        word,
        similarity: count > 0 ? totalSim / count : 0,
      }
    },
  )

  // Sort by similarity in descending order
  return similarities.sort((a, b) => b.similarity - a.similarity)
}

// Example usage
async function main() {
  const candidates = [
    'ocean',
    'sand',
    'waves',
    'beach',
    'mountain',
    'tree',
    'vacation',
    'hand',
    'helper',
    'vomit',
    'seaside',
    'coast',
    'computer',
    'keyboard',
    'surf',
    'swimming',
    'sea',
    'otter',
    'hair',
  ]

  try {
    const results = await getRelatedWords('ocean', candidates)
    console.log('Related words:', results)
  } catch (error) {
    console.error('Error in main:', error)
  }
}

main()
