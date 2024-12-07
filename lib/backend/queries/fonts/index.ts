import { ListFonts } from './constants'

export async function list(source: ListFonts) {
  // if (source.slugs) {
  //   return await listBySlugs(source)
  // } else {
  //   return await listGlobally(source)
  // }
}

// export async function upload(source: UploadFont) {
//   const input = UploadFont.parse(source)

//   // await db.deleteFrom('font_variant_chunk').execute()
//   // await db.deleteFrom('font_variant').execute()
//   // await db.deleteFrom('font').execute()

//   const existing = await db
//     .selectFrom('font')
//     .where('slug', '=', input.slug)
//     .executeTakeFirst()

//   if (existing) {
//     throw new Error(`Font already exists.`)
//   }

//   const font = {
//     family: input.family,
//     test: input.test,
//     slug: input.slug,
//   }

//   const fontRecord = await db
//     .insertInto('font')
//     .values(font)
//     .returningAll()
//     .executeTakeFirstOrThrow()

//   for (const style of input.styles) {
//     const id = uuidv4()
//     const code = formHostCode(id)
//     const gcs = storage.bucket(`gs://${process.env.GOOGLE_BUCKET_NAME}`)
//     const extension = style.path.split('.').pop() as string
//     const storagePath = `${code}.${extension}`

//     try {
//       await gcs.upload(style.path, {
//         destination: storagePath,
//         // public: true,
//         metadata: {
//           contentType: MIME[extension], //application/csv for excel or csv file upload
//         },
//       })
//     } catch (e) {
//       console.log(e)
//       process.exit()
//     }

//     const data = {
//       id,
//       base__id: fontRecord.id,
//       weight: style.weight ?? 400,
//       italic: style.italic ?? null,
//     }

//     await db.insertInto('font_variant').values(data).execute()

//     const chunk = {
//       id: uuidv4(),
//       variant__id: data.id,
//       url: `https://file.word.surf/${storagePath}`,
//       format: FORMAT[extension],
//     }

//     await db.insertInto('font_variant_chunk').values(chunk).execute()
//   }
// }

// async function listBySlugs(source: ListFonts) {
//   const input = ListFontsBySlugs.parse(source)
//   const fonts = await db
//     .selectFrom('font')
//     .where('slug', 'in', input.slugs)
//     .selectAll()
//     .execute()

//   const counter = await db
//     .selectFrom('font')
//     .select(eb => eb.fn.count<number>('id').as('fonts_count'))
//     .executeTakeFirstOrThrow()

//   const variants = await loadFontVariants(fonts.map(x => x.id))
//   const variantChunks = await loadFontVariantChunks(
//     variants.map(x => x.id),
//   )

//   const output = buildListFonts({
//     fonts,
//     fontsCount: counter.fonts_count,
//     variants,
//     variantChunks,
//   })

//   return output
// }

// async function listGlobally(source: ListFonts) {
//   const input = ListFontsGlobally.parse(source)

//   const fonts = await db
//     .selectFrom('font')
//     .selectAll()
//     .orderBy('slug')
//     .limit(input.size)
//     .offset((input.page - 1) * input.size)
//     .execute()

//   const counter = await db
//     .selectFrom('font')
//     .select(eb => eb.fn.count<number>('id').as('fonts_count'))
//     .executeTakeFirstOrThrow()

//   const variants = await loadFontVariants(fonts.map(x => x.id))
//   const variantChunks = await loadFontVariantChunks(
//     variants.map(x => x.id),
//   )

//   const output = buildListFonts({
//     fonts,
//     fontsCount: counter.fonts_count,
//     variants,
//     variantChunks,
//   })

//   return output
// }

// function buildListFonts({
//   fonts,
//   fontsCount,
//   variants,
//   variantChunks,
// }: {
//   fonts: Array<DB.Font>
//   fontsCount: number
//   variants: Array<DB.FontVariant>
//   variantChunks: Array<DB.FontVariantChunk>
// }) {
//   const variantsChunksMap = variantChunks.reduce<Record<string, any>>(
//     (m, x) => {
//       m[x.variant__id] ??= []
//       m[x.variant__id].push({
//         id: formHostCode(x.id),
//         url: x.url,
//         format: x.format,
//         character_set: x.character_set,
//       })
//       return m
//     },
//     {},
//   )

//   const variantsMap = variants.reduce<Record<string, any>>((m, x) => {
//     m[x.base__id] ??= []
//     m[x.base__id].push({
//       id: formHostCode(x.id),
//       weight: x.weight,
//       italic: x.italic,
//       chunks: variantsChunksMap[x.id] ?? [],
//     })
//     return m
//   }, {})

//   const output: any = {
//     size: fontsCount,
//     list: [],
//   }

//   for (const input of fonts) {
//     output.list?.push({
//       id: formHostCode(input.id),
//       slug: input.slug,
//       family: input.family,
//       test: input.test ?? undefined,
//       provider: input.provider ?? undefined,
//       variants: variantsMap[input.id] ?? [],
//     })
//   }

//   return removeNulls(output)
// }

// async function loadFontVariants(fontIds: Array<string>) {
//   return await db
//     .selectFrom('font_variant')
//     .selectAll()
//     .where('base__id', 'in', fontIds)
//     .execute()
// }

// async function loadFontVariantChunks(variantIds: Array<string>) {
//   return await db
//     .selectFrom('font_variant_chunk')
//     .selectAll()
//     .where('variant__id', 'in', variantIds)
//     .execute()
// }

// async function makeFontCSS(fonts: Array<any>) {
//   //     return new Response(output.list.map(font => `@font-face {
//   //   font-family: "${font.family}";
//   //   src: ${font.variants.map()}
//   // }``))
// }
