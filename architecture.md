# Architecture Details

## "Prefix matching" query

For this in PostgreSQL, store the `text` in `language_string_search`, and then search by prefix.

## "Suffix matching" query

For this in PostgreSQL, store the reversed text in `text_reverse` on `language_string_search`, and then search by prefix.

## "Contains substring" query

To do this, use PostgreSQL's `pg_trgm` extension for trigram indexing. Then you can do searches like this in an optimal way:

```sql
SELECT * FROM table_name WHERE column_name ILIKE '%substring%';
```

_This works great for substrings of length 3+._

For length 1-2 substrings in the middle of a string, we should create partial indexes:

```sql
CREATE INDEX language_string_search_text_length_index ON language_string_search(text)
WHERE LENGTH(text) <= 16;
```

```sql
SELECT * FROM language_string_search
WHERE text LIKE '%xy%';
```

## Diacritic handling

To handle searching with and without diacritics, store both variants in the database in separate records. _This also works for searching by simplified and traditional Chinese text, for example._

## Anagrams query

For a given input string, you sort the characters, and chunk them into all combinations up to 8 characters in length. We choose 8 because the longer the string, the more combinations it has. The equation is:

$$
\frac{n!}{k!(n-k)!}
$$

So for 16 variants, that is $2^{16} - 1 = 65,535$, which is too many to query for.

But $2^{8} = 256$, which is more manageable. For **total characters**, we have the equation $n*2^{n−1}$.

Given these 256 inputs, we can dynamically find anagrams for new short strings.

But if we have precomputed the anagrams, we can go for longer strings up to arbitrary length (realistically up to 64 characters). This is because the matches will be very sparse.

We query `language_anagram_permutation` for the input, and if found, we join the results with `language_anagram_permutation_component`, to find `language_anagram` records, which link to the actual `language_string`.

## Syllable length query

To search words by syllable length, we precompute the syllable chains for each word whenever possible (given phonetic transcription as IPA or Talk). Otherwise, we can't search it for now.

## Rhymes query

For the rhymes, we base it on syllable similarity matching, precomputing the rhymes and saving to the database.

We have a `language_rhyme_component` table, which stores the rhyming suffix, and map it to the `language_rhyme` table, which links the components to `language_pronunciation` records.

_This way, all words aren't linked to every other rhyming word. Instead, all words are linked to rhyme suffixes, and through that association, we can find rhyming words._

## Pronunciation query

To query by pronunciation, we do basically prefix/suffix search on phonetic transcriptions. The Talk ASCII is converted into a single character form, so we can search by individual characters.

Then we also generate increasingly simplified forms for each provided pronunciation text. This way, you can search for "bir" (beer) as "bIr" (bihr), and because it simplifies the `I` vowel to `i`, it will find it. This is like the SOUNDEX phonetic algorithm/system.

For example, inputting `greIdAotxs` results in:

```
greIdAotxs (1) = 삩샩멯긏삲눯뺏상샮샔
greidotxs (0.7147) = 삩샩멯롟삲뺏상샮샔
gradatxs (0.572) = 삩샩뱿삲뱿상샮샔
kreItAotxs (0.4293) = 샇샩멯긏상눯뺏상샮샔
kreitotxs (0.2867) = 샇샩멯롟상뺏상샮샔
kratatxs (0.2153) = 샇샩뱿상뱿상샮샔
grdtxs (0.144) = 삩샩삲상샮샔
krttxs (0.0013) = 샇샩상상샮샔
```

We then search by taking user phonetic input string, and matching it against these strings, then looking those up by prefix search.

We convert the input Talk ASCII string to Talk Machine like this:

```ts
talk.machine('greIdAotxs') // => 삩샩멯긏삲눯뺏상샮샔
```

It is Korean Hangul Jamo syllables, since all phonetic character combinations can fit as single glyphs within that block.

## Arabic/Hebrew "root" query

This is just a property on the `language_string` table. So we have a query for that.

## "Semantic similarity" query

For this, we can search by definition! We do this by creating a vector embedding of the definitions for a string, and storing them in the `language_definition_embedding` table.

Then when you mark "search by meaning", it will convert the data into a feature vector and query against the `data` field on that embedding table.

## Consonant/vowel pattern query

Search `language_pronunciation` by `CVC` or `CVVCV`, etc.. on either `pattern` or `pattern_simplified` (simplified means consonants and vowels are grouped).

## Word length query

Search `language_transcription` for `length`.

## String by role query

Can filter by the `role` property on `language_string`.

## Derived forms query

Search `language_string` where `base__id IS NOT NULL`.

## Numerological query

Search strings by their numerological sum on `integer_transcription_binding`, where:

- `calculation` is `mass` (sum) or `fold` (reduction).
- `system` is a base Gematria system.
- `transcription` is the resulting matching transcription, from which you can derive the base `language_string`.

## Synonym query

_TODO: Add support in future. Need a database of synonyms! Or doing the manual work to link words together._

Once we have the data, we can store the `source` and `target` in the `language_synonym` table.

## Antonym query

_TODO: Add support in future like synonyms._

## String frequency list query

Strings can be part of frequency lists for a corpus.

## External REST API

The external REST API endpoints are for people to load and play with data.

## Internal REST API

The internal REST API endpoints are to help the website render. Sometimes we can get by with using the External REST API endpoints, but other times it makes more sense to have endpoints tailored for each view.

## Content/Media Management

If the content like images or videos/documents/etc. is associated with an object through a collection, then it is kept around and not "garbage collected" in the database.

Every time content is _unlinked from an object/page/user_, we do a query to see if it is attached to anything else. If so, we don't delete it. Otherwise we can delete it.

## Icon Buttons

- menu icon in the top right
- settings gear icon in the bottom right
- pencil icon in the bottom right
- user login on bottom left

## LTR/RTL Text

- https://codemirror.net/examples/bidi/#:~:text=To%20create%20a%20basic%20editor,with%20a%20direction%3A%20rtl%20property.

## Tags

Things can be tagged up to 8 times.
