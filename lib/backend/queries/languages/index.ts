import _ from 'lodash'
import { GetLanguageResponse } from '~/lib/shared/queries/languages'
import dayjs from '~/lib/shared/utilities/dayjs'
import { matchToneCode8 } from '~/lib/shared/utilities/id'
import { idToIntTone, intToIdTone } from '~/lib/shared/utilities/int'
import { db } from '~/lib/shared/utilities/kysely'
import { removeNulls } from '~/lib/shared/utilities/object'
import {
  CreateLanguage,
  GetLanguageId,
  ListLanguages,
  UpdateLanguage,
} from './constants'

export async function listLanguages(input: ListLanguages) {
  return await listGlobally(input)
}

export async function getLanguageIdAsInt(source: GetLanguageId) {
  const input = GetLanguageId.parse(source)

  if (matchToneCode8(input.key)) {
    return idToIntTone(input.key)
  } else {
    const language = await db
      .selectFrom('language')
      .select('id')
      .where('slug', '=', input.key)
      .executeTakeFirstOrThrow()

    return language.id
  }
}

export async function getLanguageId({ key }: { key: number | string }) {
  if (typeof key === 'number') {
    return key
  } else if (key.match(/^[A-Z]{8}$/)) {
    return idToIntTone(key)
  } else {
    const { id } = await db
      .selectFrom('language')
      .select('id')
      .where('slug', '=', key)
      .executeTakeFirstOrThrow()

    return id
  }
}

export async function findLanguage({ key }: { key: number | string }) {
  if (typeof key === 'number') {
    throw new Error()
  } else if (key.match(/^[A-Z]{8}$/)) {
    throw new Error()
  } else {
    return await findLanguageBySlug({ slug: key })
  }
}

export async function getLanguage({ slug }: { slug: string }) {
  const languageId = await getLanguageId({ key: slug })
  let query = db
    .selectFrom('language')
    .selectAll()
    .where('id', '=', languageId)

  const languageRecord = await query.executeTakeFirstOrThrow()

  const language = removeNulls({
    id: intToIdTone(languageRecord.id),
    slug: languageRecord.slug,
    name: languageRecord.name,
    iso639_1: languageRecord.iso639_1,
    iso639_2: languageRecord.iso639_2,
    iso639_3: languageRecord.iso639_3,
    category: languageRecord.category,
    is_natural: languageRecord.is_natural,
    is_constructed: languageRecord.is_constructed,
  })

  const output: GetLanguageResponse = {
    languages: {
      size: 1,
      list: [language],
    },
    collaborators: {
      size: 0,
      list: [],
    },
  }

  return output
}

export async function findLanguageBySlug({ slug }: { slug: string }) {
  let query = db
    .selectFrom('language')
    .selectAll()
    .where('slug', '=', slug)

  const language = await query.executeTakeFirstOrThrow()

  return removeNulls({
    id: intToIdTone(language.id),
    slug: language.slug,
    name: language.name,
    iso639_1: language.iso639_1,
    iso639_2: language.iso639_2,
    iso639_3: language.iso639_3,
    category: language.category,
    is_natural: language.is_natural,
    is_constructed: language.is_constructed,
  })
}

async function listGlobally(source: ListLanguages) {
  const input = ListLanguages.parse(source)

  const counter = await db
    .selectFrom('language')
    .select(eb => eb.fn.count<number>('id').as('count'))
    .executeTakeFirstOrThrow()

  const languages = await db
    .selectFrom('language')
    .selectAll()
    .orderBy('slug')
    .limit(input.size!)
    .offset((input.page! - 1) * input.size!)
    .execute()

  const outputLanguages = removeNulls({
    size: counter.count,
    list: languages.map(x => ({
      id: intToIdTone(x.id),
      // code: { like: 'string' },
      slug: x.slug,
      name: x.name,
      iso639_1: x.iso639_1,
      iso639_2: x.iso639_2,
      iso639_3: x.iso639_3,
      category: x.category,
      // flow_code_seed: { like: 'integer', fall: 0 },
      is_natural: x.is_natural,
      is_constructed: x.is_constructed,
      updated_at: x.updated_at,
    })),
  })

  return {
    type: 'success',
    data: {
      languages: outputLanguages,
    },
  }
}

export async function createLanguage(source: CreateLanguage) {
  const input = CreateLanguage.parse(source)

  const insert = {
    ...input,
    updated_at: dayjs.utc().toDate(),
  }

  const languageRecord = await db
    .insertInto('language')
    .values(insert)
    .returningAll()
    .executeTakeFirstOrThrow()

  const language = {
    id: intToIdTone(languageRecord.id),
    name: languageRecord.name,
    slug: languageRecord.slug,
    is_constructed: languageRecord.is_constructed,
  }

  const output = {
    languages: {
      size: 1,
      list: [language],
    },
  }

  return removeNulls(output)
}

export async function update(source: UpdateLanguage) {
  const input = UpdateLanguage.parse(source)

  const updates = {
    ..._.omit(input, ['id']),
    updated_at: dayjs.utc().toDate(),
  }

  await db
    .updateTable('language')
    .where('id', '=', input.id)
    .set(updates)
    .execute()

  return updates
}
