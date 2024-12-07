import uniq from 'lodash/uniq'
import { resolveLanguageStrings } from '~/lib/backend/queries/language-strings'
import { LanguageMinimalPair, List } from '~/lib/shared/constants'
import { bigintToIdTone } from '~/lib/shared/utilities/bigint'
import { intToIdTone } from '~/lib/shared/utilities/int'
import { db } from '~/lib/shared/utilities/kysely'
import { removeNulls } from '~/lib/shared/utilities/object'
import { ListLanguageMinimalPairs } from './constants'

export async function listLanguageMinimalPairs(
  source: ListLanguageMinimalPairs,
) {
  const input = ListLanguageMinimalPairs.parse(source)

  const minimalPairRecords = await db
    .selectFrom('language_minimal_pair')
    .selectAll()
    .where('language__id', '=', input.languageId)
    .limit(input.size!)
    .offset((input.page! - 1) * input.size!)
    .execute()

  const minimalPairsCounter = await db
    .selectFrom('language_minimal_pair')
    .select(eb => eb.fn.count<number>('id').as('count'))
    .executeTakeFirstOrThrow()

  const minimalPairs: List<LanguageMinimalPair> = {
    size: minimalPairsCounter.count,
    list: [],
  }

  const stringIds = uniq(
    minimalPairRecords.map(x => [x.source__id, x.target__id]).flat(),
  )

  const strings = await db
    .selectFrom('language_string')
    .selectAll()
    .orderBy('text')
    .where('id', 'in', stringIds)
    .execute()

  const data = await resolveLanguageStrings(strings, {
    pronunciation: true,
    transcription: true,
  })

  minimalPairs.list.push(
    ...minimalPairRecords.map(x => ({
      id: bigintToIdTone(BigInt(x.id)),
      difference: x.difference,
      language: {
        id: intToIdTone(x.language__id!),
      },
      source: {
        id: bigintToIdTone(x.source__id),
      },
      target: {
        id: bigintToIdTone(x.target__id),
      },
    })),
  )

  return removeNulls({
    ...data,
    pairs: minimalPairs,
  })
}
