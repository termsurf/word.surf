import uniq from 'lodash/uniq'
import {
  LanguageMinimalPair,
  LanguageMinimalPairListItem,
  List,
} from '~/lib/shared/constants'
import { bigintToIdTone } from '~/lib/shared/utilities/bigint'
import { intToIdTone } from '~/lib/shared/utilities/int'
import { db } from '~/lib/shared/utilities/kysely'
import { removeNulls } from '~/lib/shared/utilities/object'
import { resolveLanguageStrings } from '../language-strings'
import {
  FindLanguageMinimalPairList,
  ListLanguageMinimalPairLists,
} from './constants'

export async function listLanguageMinimalPairLists(
  source: ListLanguageMinimalPairLists,
) {
  const input = ListLanguageMinimalPairLists.parse(source)

  const minimalPairListRecords = await db
    .selectFrom('language_minimal_pair_list')
    .selectAll()
    .where('language__id', '=', input.languageId)
    .execute()

  return removeNulls(minimalPairListRecords)
}

export async function findLanguageMinimalPairList(
  source: FindLanguageMinimalPairList,
) {
  const input = FindLanguageMinimalPairList.parse(source)

  const minimalPairListRecord = await db
    .selectFrom('language_minimal_pair_list')
    .selectAll()
    .where('language__id', '=', input.languageId)
    .where('path', '=', input.path)
    .executeTakeFirstOrThrow()

  const minimalPairListItemRecords = await db
    .selectFrom('language_minimal_pair_list_item')
    .selectAll()
    .where('list__id', '=', minimalPairListRecord.id)
    .execute()

  const minimalPairsListItemsCounter = await db
    .selectFrom('language_minimal_pair_list_item')
    .select(eb => eb.fn.count<number>('id').as('count'))
    .executeTakeFirstOrThrow()

  const minimalPairListItems: List<LanguageMinimalPairListItem> = {
    size: minimalPairsListItemsCounter.count,
    list: [],
  }

  const minimalPairLists = {
    size: 1,
    list: [
      {
        id: intToIdTone(minimalPairListRecord.id),
        path: minimalPairListRecord.path,
        items: minimalPairListItems,
      },
    ],
  }

  minimalPairListItems.list.push(
    ...minimalPairListItemRecords.map(x => ({
      id: bigintToIdTone(x.id),
      list: {
        id: intToIdTone(x.list__id),
      },
      pair: {
        id: bigintToIdTone(BigInt(x.pair__id)),
      },
      position: x.position,
    })),
  )

  const minimalPairIds = minimalPairListItemRecords.map(x =>
    String(x.pair__id),
  )

  const minimalPairRecords = await db
    .selectFrom('language_minimal_pair')
    .selectAll()
    .where('id', 'in', minimalPairIds)
    .execute()

  const minimalPairs: List<LanguageMinimalPair> = {
    size: minimalPairsListItemsCounter.count,
    list: [],
  }

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

  return removeNulls({
    ...data,
    lists: minimalPairLists,
    pairs: minimalPairs,
  })
}
