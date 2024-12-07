import { VertexAI } from '@google-cloud/vertexai'

// Initialize Vertex AI
const vertexAI = new VertexAI({
  project: process.env.GOOGLE_CLOUD_PROJECT!,
  location: process.env.GOOGLE_CLOUD_LOCATION!,
})

// Get embeddings model
const model = vertexAI.preview.getGenerativeModel({
  model: 'embedding-001',
  generationConfig: {
    temperature: 0.0,
  },
})

// async function generateEmbedding(text: string): Promise<number[]> {
//   try {
//     const embeddingResult = await model.embedContent({
//       content: {
//         parts: [{ text: text }],
//       },
//     })

//     return embeddingResult.embedding.values
//   } catch (error) {
//     console.error('Error generating embedding:', error)
//     throw error
//   }
// }

// // Example usage
// async function testEmbedding() {
//   try {
//     const embedding = await generateEmbedding('Hello world')
//     console.log('Embedding length:', embedding.length)
//     console.log('First few values:', embedding.slice(0, 5))
//   } catch (error) {
//     console.error('Error:', error)
//   }
// }
