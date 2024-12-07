import {
  CreateLanguageDraft,
  CreatePage,
  CreateScriptPage,
  UpdatePage,
} from '~/lib/shared/queries/pages'
import { bigintToIdTone } from '~/lib/shared/utilities/bigint'
import { nowUTC } from '~/lib/shared/utilities/dayjs'
import { getBigId } from '~/lib/shared/utilities/id'
import { intToIdTone } from '~/lib/shared/utilities/int'
import { db } from '~/lib/shared/utilities/kysely'
import { removeNulls } from '~/lib/shared/utilities/object'
import { getLanguageId } from '../languages'
import { GetLanguagePage } from './constants'

export enum PageCategory {
  LanguagePage = 'language-page',
}

export async function createPage(source: CreatePage) {
  const input = CreatePage.parse(source)
  if ('language' in input) {
    return createLanguagePage(input)
  }
}

export async function updatePage(sourceId: string, source: UpdatePage) {
  const input = UpdatePage.parse(source)
  const inputId = await getBigId(sourceId)

  // if (input.is_published) {

  // }

  const pageRecord = await db
    .updateTable('page')
    .where('id', '=', inputId)
    .returningAll()
    .set(input)
    .executeTakeFirstOrThrow()
}

export async function createLanguagePage(source: CreateLanguageDraft) {
  const input = CreateLanguageDraft.parse(source)
  const languageId = await getLanguageId({ key: input.language.id })

  const pageRecord = await db
    .insertInto('page')
    .returningAll()
    .values({
      title: input.title,
      category: PageCategory.LanguagePage,
      path: input.path,
      content: input.content,
      updated_at: nowUTC(),
      created_at: nowUTC(),
    })
    .executeTakeFirstOrThrow()

  const languagePageRecord = await db
    .insertInto('language_page')
    .returningAll()
    .values({
      page__id: pageRecord.id,
      language__id: languageId,
    })
    .executeTakeFirstOrThrow()

  const page = {
    id: bigintToIdTone(pageRecord.id),
    path: pageRecord.path,
    title: pageRecord.title,
    description: pageRecord.description,
    content: pageRecord.content,
    category: pageRecord.category,
  }

  const languagePage = {
    id: bigintToIdTone(languagePageRecord.id),
    page: {
      id: page.id,
    },
    language: {
      id: intToIdTone(languageId),
    },
  }

  const output = {
    pages: {
      size: 1,
      list: [page],
    },
    language_pages: {
      size: 1,
      list: [languagePage],
    },
  }

  return removeNulls(output)
}

export async function createScriptPage(source: CreateScriptPage) {
  const input = CreateScriptPage.parse(source)
  // const languageId = await getLanguageId({ key: input.language.id })

  const pageRecord = await db
    .insertInto('page')
    .returningAll()
    .values({
      title: input.title,
      category: PageCategory.LanguagePage,
      path: input.path,
      content: input.content,
      updated_at: nowUTC(),
      created_at: nowUTC(),
    })
    .executeTakeFirstOrThrow()

  // const languagePageRecord = await db
  //   .insertInto('script_page')
  //   .returningAll()
  //   .values({
  //     page__id: pageRecord.id,
  //     script__id: languageId,
  //   })
  //   .executeTakeFirstOrThrow()

  // const page = {
  //   id: bigintToIdTone(pageRecord.id),
  //   path: pageRecord.path,
  //   title: pageRecord.title,
  //   description: pageRecord.description,
  //   content: pageRecord.content,
  //   category: pageRecord.category,
  // }

  // const languagePage = {
  //   id: bigintToIdTone(languagePageRecord.id),
  //   page: {
  //     id: page.id,
  //   },
  //   language: {
  //     id: intToIdTone(languageId),
  //   },
  // }

  // const output = {
  //   pages: {
  //     size: 1,
  //     list: [page],
  //   },
  //   language_pages: {
  //     size: 1,
  //     list: [languagePage],
  //   },
  // }

  // return removeNulls(output)
}

export async function findLanguagePageContent(source: GetLanguagePage) {
  const input = GetLanguagePage.parse(source)

  const guide = await db
    .selectFrom('page')
    .select(['id', 'content'])
    .where('category', '=', PageCategory.LanguagePage)
    .where('path', '=', input.path)
    .executeTakeFirstOrThrow()

  return guide
}

export async function findLanguagePageMetadata(
  source: GetLanguagePage,
) {
  const input = GetLanguagePage.parse(source)

  const guide = await db
    .selectFrom('page')
    .select(['id', 'title', 'description', 'keywords'])
    .where('category', '=', PageCategory.LanguagePage)
    .where('path', '=', input.path)
    .executeTakeFirstOrThrow()

  return guide
}
