import { createAnagramTrie, findAnagramsForWordSubset } from '.'
import { createHebrewWordMap } from './hebrew'

const dictionary = `שָׁלוֹם
שָׁלֵם
שֻׁלַּם
חֲלוֹם
חָלַם
חוֹלֵם
מֶלֶךְ
מַלְאָךְ
מוֹלֵךְ
מֶלַח
מִלְחָם
מַלְכָּה
שָׁלַח
שׁוֹלֵחַ
סָלַח
סוֹלֵחַ
שֻׁלְחָן
סַלְחָן
עוֹלָם
עֵילָם
אוּלָם
עוֹלָמִים
שָׁמַיִם
שָׁמַע
שָׁמְעָה
שִׁמְעוֹן
שָׁמַר
שִׁמֵּר
שׁוֹמֵר
כֶּתֶר
קֶתֶר
כְּתִיב
כָּתוּב
כּוֹתֵב
קָטַב
קָטְבָם
קָטָן
קְטַנָּה
כְּתַן
כּוּתְנָה
שִׁיר
שְׁאָר
שַׁר`
  .trim()
  .split(/\n+/)

const map = createHebrewWordMap(dictionary)
const trie = createAnagramTrie([...map.keys()])
const anagrams = findAnagramsForWordSubset({
  trie,
  map,
  word: `שְׁאָר`,
})

console.log(anagrams)
