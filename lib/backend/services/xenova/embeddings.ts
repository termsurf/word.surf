import {
  FeatureExtractionPipeline,
  pipeline,
} from '@xenova/transformers'

// Create a reusable pipeline
let embeddingPipeline: FeatureExtractionPipeline | undefined

async function getEmbeddingPipeline() {
  if (!embeddingPipeline) {
    embeddingPipeline = await pipeline(
      'feature-extraction',
      // 'Xenova/all-MiniLM-L6-v2',
      'Xenova/bge-large-en-v1.5',
    )
  }
  return embeddingPipeline
}

// const embedding = await generateEmbedding("Oak tree. Quercus X. Plant.");
export async function generateEmbedding(
  text: string,
): Promise<Array<number>> {
  try {
    const pipe = await getEmbeddingPipeline()
    const output = await pipe(text, { pooling: 'mean' })
    return Array.from(output.data)
  } catch (error) {
    console.error('Error generating embedding:', error)
    throw error
  }
}
