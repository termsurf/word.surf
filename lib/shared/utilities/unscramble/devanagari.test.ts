import { createAnagramTrie, findAnagramsForWordSubset } from '.'
import { createDevanagariWordMap } from './devanagari'

const dictionary = `राम
रामा
रम
रमा
राज
राजा
राञ्ज
रञ्ज
धर
धरा
ध्र
धृ
भव
भवः
भाव
भावः
सत
सत्य
सति
सता`
  .trim()
  .split(/\n+/)

const map = createDevanagariWordMap(dictionary)
const trie = createAnagramTrie([...map.keys()])
const anagrams = findAnagramsForWordSubset({
  trie,
  map,
  word: `सति`,
})

console.log(anagrams)
