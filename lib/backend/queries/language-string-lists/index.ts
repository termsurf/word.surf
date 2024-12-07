// list
//   path
//   items
//     - language
//       components
//         - x

export async function findLanguageList(source) {
  // const language = await findLanguage({ key: source.key })
  // const englishLanguage = await findLanguage({ key: 'english' })
  // const englishList = await db
  //   .selectFrom('language_list')
  //   .selectAll()
  //   .where('path', '=', source.path)
  //   .executeTakeFirstOrThrow()
  // const items = await db
  //   .selectFrom('language_list_item')
  //   .selectAll()
  //   .where('list__id', '=', englishList.id)
  //   .execute()
  // const sources = items.length
  //   ? await db
  //       .selectFrom('language_string')
  //       .selectAll()
  //       .where(
  //         'id',
  //         'in',
  //         items.map(x => x.component__id),
  //       )
  //       .execute()
  //   : []
  // const sourcesById = _.keyBy(sources, 'id')
  // const mappings = items.length
  //   ? await db
  //       .selectFrom('language_translation')
  //       .selectAll()
  //       .innerJoin(
  //         'language_string',
  //         'language_string.id',
  //         'language_translation.target__id',
  //       )
  //       .where(
  //         'language_string.language__id',
  //         '=',
  //         formCodeHost(language.id),
  //       )
  //       .where(
  //         'source__id',
  //         'in',
  //         items.map(x => x.component__id),
  //       )
  //       .execute()
  //   : []
  // const mappingsBySourceId = _.groupBy(mappings, 'source__id')
  // const targets = await db
  //   .selectFrom('language_string')
  //   .selectAll()
  //   .where(
  //     'id',
  //     'in',
  //     mappings.map(x => x.target__id),
  //   )
  //   .execute()
  // const targetsById = _.keyBy(targets, 'id')
  // const contextIds = _.uniq(
  //   sources
  //     .map(x => x.context__id)
  //     .concat(targets.map(x => x.context__id))
  //     .filter(x => x),
  // )
  // const contexts = contextIds.length
  //   ? await db
  //       .selectFrom('language_string')
  //       .select(['id', 'text'])
  //       .where('id', 'in', contextIds)
  //       .execute()
  //   : []
  // const contextsById = _.keyBy(contexts, 'id')
  // const expressions = targets.length
  //   ? await db
  //       .selectFrom('language_expression')
  //       .selectAll()
  //       .distinctOn('component__id')
  //       .where(
  //         'component__id',
  //         'in',
  //         targets.map(x => x.id),
  //       )
  //       .execute()
  //   : []
  // const scriptsMap = {}
  // const schemesMap = {}
  // const accentsMap = {}
  // const expressionsByComponentMap = _.groupBy(
  //   expressions,
  //   'component__id',
  // )
  // const pronunciations = expressions.length
  //   ? await db
  //       .selectFrom('language_pronunciation')
  //       .distinctOn('expression__id')
  //       .orderBy(['expression__id', 'position'])
  //       .selectAll()
  //       .where(
  //         'expression__id',
  //         'in',
  //         expressions.map(x => x.id),
  //       )
  //       .limit(1)
  //       .execute()
  //   : []
  // const pronunciationsByExpressionId = _.groupBy(
  //   pronunciations,
  //   'expression__id',
  // )
  // pronunciations.forEach(x => {
  //   if (x.accent__id) {
  //     accentsMap[x.accent__id] = true
  //   }
  // })
  // const pronunciationVariants = pronunciations.length
  //   ? await db
  //       .selectFrom('language_pronunciation_variant')
  //       .distinctOn('pronunciation__id')
  //       .orderBy(['pronunciation__id', 'position'])
  //       .selectAll()
  //       .where(
  //         'pronunciation__id',
  //         'in',
  //         pronunciations.map(x => x.id),
  //       )
  //       .limit(1)
  //       .execute()
  //   : []
  // const pronunciationVariantsByPronunciationId = _.groupBy(
  //   pronunciationVariants,
  //   'pronunciation__id',
  // )
  // const pronunciationTranscriptions = pronunciationVariants.length
  //   ? await db
  //       .selectFrom('language_pronunciation_transcription')
  //       .selectAll()
  //       .where(
  //         'variant__id',
  //         'in',
  //         pronunciationVariants.map(x => x.id),
  //       )
  //       .execute()
  //   : []
  // const pronunciationTranscriptionsByVariantId = _.groupBy(
  //   pronunciationTranscriptions,
  //   'variant__id',
  // )
  // pronunciationTranscriptions.forEach(t => {
  //   if (t.script__id) {
  //     scriptsMap[t.script__id] = true
  //   }
  //   if (t.scheme__id) {
  //     schemesMap[t.scheme__id] = true
  //   }
  // })
  // const transcriptions = expressions.length
  //   ? await db
  //       .selectFrom('language_transcription')
  //       .selectAll()
  //       .distinctOn('expression__id')
  //       .orderBy(['expression__id'])
  //       .where(
  //         'expression__id',
  //         'in',
  //         expressions.map(x => x.id),
  //       )
  //       .execute()
  //   : []
  // const transcriptionsByExpressionId = _.groupBy(
  //   transcriptions,
  //   'expression__id',
  // )
  // transcriptions.forEach(t => {
  //   if (t.script__id) {
  //     scriptsMap[t.script__id] = true
  //   }
  //   if (t.scheme__id) {
  //     schemesMap[t.scheme__id] = true
  //   }
  // })
  // const scriptIds = Object.keys(scriptsMap)
  // const schemeIds = Object.keys(schemesMap)
  // const accentIds = Object.keys(accentsMap)
  // const scripts = scriptIds.length
  //   ? await db
  //       .selectFrom('script')
  //       .selectAll()
  //       .where('id', 'in', scriptIds)
  //       .execute()
  //   : []
  // const schemes = schemeIds.length
  //   ? await db
  //       .selectFrom('language_encoding_scheme')
  //       .selectAll()
  //       .where('id', 'in', schemeIds)
  //       .execute()
  //   : []
  // const accents = accentIds.length
  //   ? await db
  //       .selectFrom('language_accent')
  //       .selectAll()
  //       .where('id', 'in', accentIds)
  //       .execute()
  //   : []
  // const output = {
  //   path: source.path,
  //   languages: [
  //     {
  //       id: englishLanguage.id,
  //       slug: englishLanguage.slug,
  //       name: englishLanguage.name,
  //     },
  //     {
  //       id: language.id,
  //       slug: language.slug,
  //       name: language.name,
  //     },
  //   ],
  //   items: items.map(i => {
  //     const english = sourcesById[i.component__id]
  //     const targetMappings = mappingsBySourceId[i.component__id] ?? []
  //     return {
  //       id: formHostCode(i.id),
  //       position: i.position,
  //       translations: [
  //         {
  //           language: {
  //             id: englishLanguage.id,
  //           },
  //           components: [
  //             {
  //               id: formHostCode(english.id),
  //               role: english.role,
  //               text: english.text,
  //               context: english.context__id
  //                 ? contextsById[english.context__id]
  //                 : undefined,
  //               position: 0,
  //             },
  //           ],
  //         },
  //         {
  //           language: {
  //             id: language.id,
  //           },
  //           components: targetMappings.map((t, i) => {
  //             const target = targetsById[t.target__id]
  //             const expressions =
  //               expressionsByComponentMap[t.target__id] ?? []
  //             return {
  //               id: formHostCode(target.id),
  //               role: target.role,
  //               text: target.text,
  //               context: target.context__id
  //                 ? contextsById[target.context__id]
  //                 : undefined,
  //               position: i,
  //               expressions: expressions.map((e, i) => {
  //                 const pronunciations =
  //                   pronunciationsByExpressionId[e.id] ?? []
  //                 const transcriptions =
  //                   transcriptionsByExpressionId[e.id] ?? []
  //                 return {
  //                   id: formHostCode(e.id),
  //                   pronunciations: pronunciations.map(p => {
  //                     const variants =
  //                       pronunciationVariantsByPronunciationId[p.id] ??
  //                       []
  //                     return {
  //                       id: formHostCode(p.id),
  //                       accent: p.accent__id
  //                         ? { id: p.accent__id }
  //                         : undefined,
  //                       variants: variants.map(v => {
  //                         const transcriptions =
  //                           pronunciationTranscriptionsByVariantId[
  //                             v.id
  //                           ] ?? []
  //                         return {
  //                           id: formHostCode(v.id),
  //                           position: v.position,
  //                           transcriptions: transcriptions.map(t => {
  //                             return {
  //                               id: formHostCode(t.id),
  //                               text: t.text,
  //                               script: t.script__id
  //                                 ? { id: formHostCode(t.script__id) }
  //                                 : undefined,
  //                               scheme: t.scheme__id
  //                                 ? { id: formHostCode(t.scheme__id) }
  //                                 : undefined,
  //                             }
  //                           }),
  //                         }
  //                       }),
  //                     }
  //                   }),
  //                   transcriptions: transcriptions.map(t => {
  //                     return {
  //                       id: formHostCode(t.id),
  //                       text: t.text,
  //                       script: t.script__id
  //                         ? { id: formHostCode(t.script__id) }
  //                         : undefined,
  //                       scheme: t.scheme__id
  //                         ? { id: formHostCode(t.scheme__id) }
  //                         : undefined,
  //                     }
  //                   }),
  //                 }
  //               }),
  //             }
  //           }),
  //         },
  //       ],
  //     }
  //   }),
  //   scripts: {
  //     size: scripts.length,
  //     list: scripts.map(x => ({
  //       id: formHostCode(x.id),
  //       name: x.name,
  //       slug: x.slug,
  //     })),
  //   },
  //   schemes: {
  //     size: schemes.length,
  //     list: schemes.map(x => ({
  //       id: formHostCode(x.id),
  //       name: x.name,
  //       slug: x.slug,
  //     })),
  //   },
  //   accents: {
  //     size: accents.length,
  //     list: accents.map(x => ({
  //       id: formHostCode(x.id),
  //       name: x.title,
  //       slug: x.slug,
  //     })),
  //   },
  // }
  // return removeNulls(output)
}
