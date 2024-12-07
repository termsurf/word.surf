import kebabCase from 'lodash/kebabCase'
import { z } from 'zod'
import { bigintToIdTone } from '~/lib/shared/utilities/bigint'
import { db } from '~/lib/shared/utilities/kysely'
import { pagination } from '~/lib/shared/utilities/schema'

export const CreateTags = z.object({
  slugs: z.array(z.string().transform(x => kebabCase(x.trim()))),
})

export type CreateTags = z.infer<typeof CreateTags>

export async function createTags(source: CreateTags) {
  const input = CreateTags.parse(source)

  await db
    .insertInto('tag')
    .values(input.slugs.map(slug => ({ slug })))
    .onConflict(oc => oc.column('slug').doNothing())
    .execute()
}

export const GetImageTags = z.object({
  ...pagination(),
  path: z.string().optional(),
})

export type GetImageTags = z.infer<typeof GetImageTags>

export async function getImageTags(source: GetImageTags) {
  const input = GetImageTags.parse(source)

  const tags = await db
    .selectFrom('tag')
    .innerJoin('image_tag', 'tag.id', 'image_tag.tag__id')
    .selectAll('tag') // Select all columns from the `tags` table
    .orderBy('tag.slug asc')
    .limit(input.size!)
    .offset((input.page! - 1) * input.size!)
    .execute()

  const counter = await db
    .selectFrom('tag')
    .select(eb => eb.fn.count<number>('id').as('count'))
    .executeTakeFirstOrThrow()

  return {
    tags: {
      size: counter.count,
      list: tags.map(tag => ({
        id: bigintToIdTone(tag.id),
        slug: tag.slug,
      })),
    },
  }
}
