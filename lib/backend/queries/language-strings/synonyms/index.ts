import fs from 'fs'
import { CompiledQuery } from 'kysely'
import path from 'path'
import { db } from '~/lib/shared/utilities/kysely'
import { removeNulls } from '~/lib/shared/utilities/object'
import { resolveLanguageStrings } from '..'
import { SearchSynonyms } from './constants'

const SEARCH = fs.readFileSync(
  path.resolve(
    './lib/backend/queries/language-anagrams/sql/search.sql',
  ),
  `utf-8`,
)

type SearchSynonymsResult = {
  string__id: string // bigint // from ls.id
  transcription__id: string // bigint // from lt.id
  anagram__id: string // bigint // from la.id
  permutation_text: string // from lap.text
  language__id: string // bigint // from lap.language__id
  script__id: string // bigint // from lap.script__id
  total_count: number // from tc.total_count
}

export async function searchSynonyms(source: SearchSynonyms) {
  const input = SearchSynonyms.parse(source)
  const offset = (input.page! - 1) * input.size!

  const text = [...input.text].sort().join('')

  const query = CompiledQuery.raw(SEARCH, [
    text,
    input.languageId,
    input.scriptId,
    input.size!,
    offset,
  ])

  const matches = (
    (await db.executeQuery(query)) as unknown as Array<Array<string>>
  ).map(fields => ({
    string__id: fields[0]!,
    transcription__id: fields[1],
    anagram__id: fields[1],
    permutation_text: fields[1],
    language__id: fields[1],
    script__id: fields[1],
    total_count: parseInt(fields[1], 10),
  })) satisfies Array<SearchSynonymsResult>

  const totalCount = matches[0]?.total_count

  const strings = await db
    .selectFrom('language_string')
    .selectAll()
    .orderBy('text')
    .where(
      'id',
      'in',
      matches.map(x => x.string__id),
    )
    .execute()

  const data = await resolveLanguageStrings(strings, {
    pronunciations: true,
    transcriptions: true,
    definitions: true,
  })

  return removeNulls(data)
}
