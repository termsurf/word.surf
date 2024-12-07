const wordnet = require('wordnet')

async function getRelationships(word: string) {
  try {
    // Initialize wordnet first
    await wordnet.init()

    const results = await wordnet.lookup(word)
    const relationships = {
      synonyms: new Set<string>(),
      hypernyms: new Set<string>(), // @
      hyponyms: new Set<string>(), // ~
      instanceHyponyms: new Set<string>(), // ~i
      meronyms: new Set<string>(), // #p
      derivedTerms: new Set<string>(), // +
      coordinates: new Set<string>(), // -c
    }

    for (const result of results) {
      // Add synonyms from the main synset
      result.meta.words.forEach(w => relationships.synonyms.add(w.word))

      // Process pointers
      for (const ptr of result.meta.pointers) {
        if (ptr.data?.meta?.words) {
          const words = ptr.data.meta.words
            .map(w => w.word)
            .map(formatWord)

          switch (ptr.pointerSymbol) {
            case '@':
              words.forEach(w => relationships.hypernyms.add(w))
              break
            case '~':
              words.forEach(w => relationships.hyponyms.add(w))
              break
            case '~i':
              words.forEach(w => relationships.instanceHyponyms.add(w))
              break
            case '#p':
              words.forEach(w => relationships.meronyms.add(w))
              break
            case '+':
              words.forEach(w => relationships.derivedTerms.add(w))
              break
            case '-c':
              words.forEach(w => relationships.coordinates.add(w))
              break
          }
        }
      }
    }

    return relationships
  } catch (error) {
    console.error('Error in getRelationships:', error)
    throw error
  }
}

async function main() {
  try {
    console.log('Initializing WordNet...')
    await wordnet.init()
    console.log('WordNet initialized')

    const word = 'ocean'
    console.log(`\nFinding semantic relationships for "${word}"...\n`)

    const relationships = await getRelationships(word)

    console.log(
      'Synonyms:',
      Array.from(relationships.synonyms).join(', ') || 'None',
    )

    console.log('\nHierarchical relationships:')
    console.log(
      '- More general terms (hypernyms):',
      Array.from(relationships.hypernyms).join(', ') || 'None',
    )
    console.log(
      '- More specific terms (hyponyms):',
      Array.from(relationships.hyponyms).join(', ') || 'None',
    )
    console.log(
      '- Specific instances:',
      Array.from(relationships.instanceHyponyms).join(', ') || 'None',
    )

    console.log('\nPart relationships:')
    console.log(
      '- Parts (meronyms):',
      Array.from(relationships.meronyms).join(', ') || 'None',
    )

    console.log('\nLexical relationships:')
    console.log(
      '- Derived terms:',
      Array.from(relationships.derivedTerms).join(', ') || 'None',
    )
    console.log(
      '- Coordinate terms:',
      Array.from(relationships.coordinates).join(', ') || 'None',
    )

    const allTerms = new Set([
      ...Array.from(relationships.synonyms),
      ...Array.from(relationships.hypernyms),
      ...Array.from(relationships.hyponyms),
      ...Array.from(relationships.instanceHyponyms),
      ...Array.from(relationships.meronyms),
      ...Array.from(relationships.derivedTerms),
      ...Array.from(relationships.coordinates),
    ])
    allTerms.delete(word)

    console.log(`\nTotal unique related terms: ${allTerms.size}`)
    console.log(allTerms)
  } catch (error) {
    if ((error as Error).message.includes('No definition')) {
      console.error('\nError: Word not found in WordNet database')
      console.log('\nTroubleshooting steps:')
      console.log('1. Make sure wordnet-db is installed:')
      console.log('   npm install wordnet-db')
      console.log('2. Try another word to verify WordNet is working')
    } else {
      console.error('Error:', error)
    }
  }
}

// Add error handler for uncaught promises
process.on('unhandledRejection', error => {
  console.error('Unhandled promise rejection:', error)
})

main()

function formatWord(word: string): string {
  return word.replace(/_/g, ' ')
}
