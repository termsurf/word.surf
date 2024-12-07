import simplifyPhonetics from '@termsurf/talk/make/talk/simplify'
import fs from 'fs'
import { CompiledQuery } from 'kysely'
import groupBy from 'lodash/groupBy'
import keyBy from 'lodash/keyBy'
import uniq from 'lodash/uniq'
import path from 'path'
import {
  findLanguage,
  getLanguageId,
} from '~/lib/backend/queries/languages'
import { LanguageString, List } from '~/lib/shared/constants'
import { bigintToIdTone } from '~/lib/shared/utilities/bigint'
import { idToIntTone, intToIdTone } from '~/lib/shared/utilities/int'
import { db } from '~/lib/shared/utilities/kysely'
import { removeNulls } from '~/lib/shared/utilities/object'
import {
  GetLanguageString,
  GetLanguageStringsByLanguageId,
  SearchLanguageStringsByPronunciation,
} from './constants'

const similarityThreshold = 0.3

const SEARCH_BY_TEXT_SIMILARITY = fs.readFileSync(
  path.resolve(
    './lib/backend/queries/language-strings/sql/search-by-text-similarity.sql',
  ),
  `utf-8`,
)
const SEARCH_BY_PRONUNCIATION = fs.readFileSync(
  path.resolve(
    './lib/backend/queries/language-strings/sql/search-by-pronunciation.sql',
  ),
  `utf-8`,
)

export async function searchLanguageStringsByTextSimilarity({
  searchTerm,
}: {
  searchTerm: string
}) {
  const query = CompiledQuery.raw(SEARCH_BY_TEXT_SIMILARITY, [
    searchTerm,
    similarityThreshold,
    20,
  ])

  const matches = (await db.executeQuery(query)) as unknown as Array<{
    component__id: string
  }>

  const strings = await db
    .selectFrom('language_string')
    .selectAll()
    .orderBy('text')
    .where(
      'id',
      'in',
      matches.map(x => x.component__id),
    )
    // .limit(input.size)
    // .offset((input.page - 1) * input.size)
    .execute()

  const data = await resolveLanguageStrings(strings, {
    pronunciations: true,
    transcriptions: true,
    definitions: true,
  })

  return removeNulls(data)
}

export async function searchLanguageStringsByPronunciation(
  source: SearchLanguageStringsByPronunciation,
) {
  const input = SearchLanguageStringsByPronunciation.parse(source)
  const offset = (input.page! - 1) * input.size!
  const simplifiedPronunciations = simplifyPhonetics(input.text)
  const simplifiedPronunciationCodes = simplifiedPronunciations.map(
    x => x.code,
  )
  const simplifiedPronunciationScores = simplifiedPronunciations.map(
    x => x.mass,
  )
  const query = CompiledQuery.raw(SEARCH_BY_PRONUNCIATION, [
    simplifiedPronunciationCodes,
    simplifiedPronunciationScores,
    input.size!,
    offset,
  ])

  const matches = (
    (await db.executeQuery(query)) as unknown as Array<Array<string>>
  ).map(fields => ({
    string__id: fields[0],
    match_score: parseFloat(fields[1]),
    total_count: parseInt(fields[2], 10),
  }))

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

export async function listLanguageStringsByLanguage(
  source: GetLanguageStringsByLanguageId,
) {
  const input = GetLanguageStringsByLanguageId.parse(source)
  const language = await findLanguage({ key: input.languageId })

  const strings = await db
    .selectFrom('language_string')
    .selectAll()
    .orderBy('text')
    .where('language__id', '=', idToIntTone(language.id))
    .limit(input.size)
    .offset((input.page - 1) * input.size)
    .execute()

  if (!strings.length) {
    return
  }

  const data = await resolveLanguageStrings(strings, {
    pronunciations: true,
    transcriptions: true,
    definitions: true,
  })

  return removeNulls(data)
}

export type ResolveLanguageStringsFields = {
  pronunciations?: boolean
  transcriptions?: boolean
  definitions?: boolean
  pronunciation?: boolean
  transcription?: boolean
  gloss?: boolean
}

export async function resolveLanguageStrings(
  strings: Array<any>,
  fields: ResolveLanguageStringsFields,
) {
  const contextIds = strings.map(x => x.context__id).filter(x => x)
  const contexts = contextIds.length
    ? await db
        .selectFrom('language_string')
        .selectAll()
        .where('context__id', 'in', contextIds)
        .execute()
    : []

  const contextsMap = keyBy(contexts, 'id')

  const scriptsMap = {}
  const schemesMap = {}
  const accentsMap = {}

  const stringIds = strings.map(x => x.id)

  const wantsPronunciations =
    fields.pronunciations || fields.pronunciation
  const pronunciations =
    wantsPronunciations && stringIds.length
      ? await db
          .selectFrom('language_pronunciation')
          .orderBy(['position'])
          .selectAll()
          .where('string__id', 'in', stringIds)
          .limit(fields.pronunciation ? 1 : 4)
          .execute()
      : []

  const pronunciationsByStringId = groupBy(pronunciations, 'string__id')

  pronunciations.forEach(x => {
    if (x.accent__id) {
      accentsMap[x.accent__id] = true
    }
    if (x.script__id) {
      scriptsMap[x.script__id] = true
    }
    if (x.scheme__id) {
      schemesMap[x.scheme__id] = true
    }
  })

  const wantsTranscriptions =
    fields.transcriptions || fields.transcription
  const transcriptions =
    wantsTranscriptions && stringIds.length
      ? await db
          .selectFrom('language_transcription')
          .selectAll()
          .where('string__id', 'in', stringIds)
          .limit(fields.transcription ? 1 : 4)
          .execute()
      : []

  const transcriptionsByStringId = groupBy(transcriptions, 'string__id')

  transcriptions.forEach(t => {
    if (t.script__id) {
      scriptsMap[t.script__id] = true
    }
    if (t.scheme__id) {
      schemesMap[t.scheme__id] = true
    }
  })

  const scriptIds = Object.keys(scriptsMap).map(Number)
  const schemeIds = Object.keys(schemesMap).map(Number)
  const accentIds = Object.keys(accentsMap).map(Number)

  const scripts = scriptIds.length
    ? await db
        .selectFrom('script')
        .selectAll()
        .where('id', 'in', scriptIds)
        .execute()
    : []
  const schemes = schemeIds.length
    ? await db
        .selectFrom('language_encoding_scheme')
        .selectAll()
        .where('id', 'in', schemeIds)
        .execute()
    : []
  const accents = accentIds.length
    ? await db
        .selectFrom('language_accent')
        .selectAll()
        .where('id', 'in', accentIds)
        .execute()
    : []

  let definitionsByStringId = {}

  if (fields.gloss) {
    const gloss = stringIds
      ? await db
          .selectFrom('language_definition')
          .selectAll()
          .where('string__id', 'in', stringIds)
          .orderBy(['position asc'])
          .executeTakeFirst()
      : undefined

    if (gloss?.string__id) {
      definitionsByStringId[gloss.string__id] = gloss
    }
  } else if (fields.definitions) {
    const definitions = stringIds
      ? await db
          .selectFrom('language_definition')
          .selectAll()
          .where('string__id', 'in', stringIds)
          .orderBy(['position asc'])
          .execute()
      : undefined
    definitionsByStringId = groupBy(definitions, 'string__id')
  }

  const stringCounter = await db
    .selectFrom('language_string')
    .select(eb => eb.fn.count<number>('id').as('count'))
    .executeTakeFirstOrThrow()

  const outputStrings: List<LanguageString> = {
    size: stringCounter.count,
    list: [],
  }

  const output = {
    strings: outputStrings,
    scripts: {
      size: scripts.length,
      list: scripts.map(x => ({
        id: intToIdTone(x.id),
        name: x.name,
        slug: x.slug,
      })),
    },
    schemes: {
      size: schemes.length,
      list: schemes.map(x => ({
        id: intToIdTone(x.id),
        name: x.name,
        slug: x.slug,
      })),
    },
    accents: {
      size: accents.length,
      list: accents.map(x => ({
        id: intToIdTone(x.id),
        name: x.name,
        slug: x.slug,
      })),
    },
  }

  for (const input of strings) {
    const stringSenses = definitionsByStringId[input.id] ?? []
    const transcriptions = transcriptionsByStringId[input.id]
    const pronunciations = pronunciationsByStringId[input.id]
    outputStrings.list.push({
      id: bigintToIdTone(BigInt(input.id)),
      text: input.text,
      role: input.role,
      context: input.context__id
        ? {
            id: bigintToIdTone(input.context__id),
            text: contextsMap[input.context__id].text,
          }
        : undefined,
      language: {
        id: intToIdTone(input.language__id),
      },
      transcriptions: transcriptions.length
        ? transcriptions.map(t => {
            return {
              id: bigintToIdTone(BigInt(t.id)),
              text: t.text,
              script: t.script__id
                ? { id: intToIdTone(t.script__id) }
                : undefined,
              scheme: t.scheme__id
                ? { id: intToIdTone(t.scheme__id) }
                : undefined,
            }
          })
        : undefined,
      pronunciations: pronunciations.length
        ? pronunciations.map(t => {
            return {
              id: bigintToIdTone(BigInt(t.id)),
              position: t.position,
              talk: t.talk,
              ipa: t.ipa,
              xsampa: t.xsampa,
              script: t.script__id
                ? { id: intToIdTone(t.script__id) }
                : undefined,
              scheme: t.scheme__id
                ? { id: intToIdTone(t.scheme__id) }
                : undefined,
              accent: t.accent__id
                ? { id: intToIdTone(t.accent__id) }
                : undefined,
            }
          })
        : undefined,
      definitions: stringSenses.length
        ? stringSenses.map(s => {
            return {
              id: bigintToIdTone(BigInt(s.id)),
              text: s.text,
              position: s.position,
            }
          })
        : undefined,
    })
  }

  return output
}

export async function getLanguageString(source: GetLanguageString) {
  const input = GetLanguageString.parse(source)

  const languageId = await getLanguageId({ key: input.language.slug })

  const language = await db
    .selectFrom('language')
    .selectAll()
    .where('id', '=', languageId)
    .executeTakeFirstOrThrow()

  const string = await db
    .selectFrom('language_string')
    .selectAll()
    .where('language__id', '=', languageId)
    .where('text', '=', input.string.text)
    .executeTakeFirstOrThrow()

  const pronunciations = await db
    .selectFrom('language_pronunciation')
    .orderBy(['position'])
    .selectAll()
    .where('string__id', '=', string.id)
    .execute()

  const transcriptions = await db
    .selectFrom('language_transcription')
    .selectAll()
    .where('string__id', '=', string.id)
    .execute()

  const scriptIds = uniq(
    transcriptions.map(x => x.script__id).filter(x => x),
  ).map(Number)

  const scripts = scriptIds.length
    ? await db
        .selectFrom('script')
        .select(['id', 'slug', 'name'])
        .where('id', 'in', scriptIds)
        .execute()
    : []

  const scriptsMap = keyBy(scripts, 'id')

  const definitions = await db
    .selectFrom('language_definition')
    .selectAll()
    .orderBy(['string__id', 'position'])
    .where('string__id', '=', string.id)
    .execute()

  const examples = await db
    .selectFrom('language_example')
    .selectAll()
    .where('string__id', '=', string.id)
    .execute()

  const output = {
    languages: {
      size: 1,
      list: [
        {
          id: intToIdTone(language.id),
          slug: language.slug,
          name: language.name,
        },
      ],
    },
    scripts: {
      size: scripts.length,
      list: scripts.map(x => ({
        id: intToIdTone(x.id),
        slug: x.slug,
        name: x.name,
      })),
    },
    strings: {
      size: 1,
      list: [
        {
          id: bigintToIdTone(BigInt(string.id)),
          text: string.text,
          role: string.role,
          context: string.context__id
            ? {
                id: bigintToIdTone(BigInt(string.context__id)),
              }
            : undefined,
          language: {
            id: language.id,
          },
          head: string.head__id
            ? {
                id: bigintToIdTone(BigInt(string.head__id)),
              }
            : undefined,
          root: string.root__id
            ? {
                id: bigintToIdTone(BigInt(string.root__id)),
              }
            : undefined,
          etymology: string.etymology,
          affix: string.affix,
          animacy: string.animacy,
          arity: string.arity,
          aspect: string.aspect,
          beneficiary: string.beneficiary,
          case: string.case,
          category: string.category,
          class: string.class,
          concreteness: string.concreteness,
          continuity: string.continuity,
          countability: string.countability,
          declension: string.declension,
          definiteness: string.definiteness,
          directionality: string.directionality,
          finiteness: string.finiteness,
          focus: string.focus,
          formality: string.formality,
          frequency: string.frequency,
          gender: string.gender,
          group: string.group,
          has_predictable_meaning: string.has_predictable_meaning,
          inclusivity: string.inclusivity,
          likelihood: string.likelihood,
          mood: string.mood,
          mutation: string.mutation,
          person: string.person,
          plurality: string.plurality,
          polarity: string.polarity,
          possessivity: string.possessivity,
          rationality: string.rationality,
          regularity: string.regularity,
          relativity: string.relativity,
          respect: string.respect,
          specificity: string.specificity,
          structure: string.structure,
          tense: string.tense,
          transitivity: string.transitivity,
          updated_at: string.updated_at,
          voice: string.voice,
          is_affix: string.is_affix,
          is_alternative: string.is_alternative,
          is_auxiliary: string.is_auxiliary,
          is_base: string.is_base,
          is_borrowed: string.is_borrowed,
          is_compound: string.is_compound,
          is_derived: string.is_derived,
          is_descendent: string.is_descendent,
          is_form: string.is_form,
          is_head: string.is_head,
          is_inflection: string.is_inflection,
          is_lead: string.is_lead,
          is_modal: string.is_modal,
          is_multi_word: string.is_multi_word,
          is_norm: string.is_norm,
          is_phrase: string.is_phrase,
          is_prefix: string.is_prefix,
          is_proper: string.is_proper,
          is_root: string.is_root,
          is_suffix: string.is_suffix,
          is_syllable: string.is_syllable,
          is_term: string.is_term,
          is_terminating: string.is_terminating,
          is_variant: string.is_variant,
          is_word: string.is_word,
          // syllable: string.syllable__max
          //   ? {
          //       min: string.syllable__min,
          //       max: string.syllable__max,
          //     }
          //   : undefined,
          transcriptions: transcriptions.map(t => {
            return {
              id: bigintToIdTone(BigInt(t.id)),
              text: t.text,
              // position: t.position,
              script: t.script__id
                ? {
                    id: intToIdTone(t.script__id),
                  }
                : undefined,
              scheme: t.scheme__id
                ? { id: intToIdTone(t.scheme__id) }
                : undefined,
              source: t.source,
              is_canonical: t.is_canonical,
              is_phonetic: t.is_phonetic,
              is_uppercase: t.is_uppercase,
              updated_at: t.updated_at,
            }
          }),
          pronunciations: pronunciations?.length
            ? pronunciations.map(t => {
                return {
                  id: bigintToIdTone(BigInt(t.id)),
                  talk: t.talk,
                  ipa: t.ipa,
                  xsampa: t.xsampa,
                  position: t.position,
                  accent: t.accent__id
                    ? { id: intToIdTone(t.accent__id) }
                    : undefined,
                  source: t.source,
                  is_canonical: t.is_canonical,
                  syllables: t.syllables__count
                    ? {
                        count: t.syllables__count,
                        spans: t.syllables__spans,
                      }
                    : undefined,
                  updated_at: t.updated_at,
                }
              })
            : undefined,
          definitions: definitions.map(s => {
            return {
              id: bigintToIdTone(BigInt(s.id)),
              position: s.position,
              text: s.text,
            }
          }),
          examples: examples.map(s => {
            return {
              id: bigintToIdTone(BigInt(s.id)),
              position: s.position,
              text: s.text,
            }
          }),
        },
      ],
    },
  }

  return removeNulls(output)
}
