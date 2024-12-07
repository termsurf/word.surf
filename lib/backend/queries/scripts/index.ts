import { intToIdTone } from '~/lib/shared/utilities/int'
import { db } from '~/lib/shared/utilities/kysely'
import { removeNulls } from '~/lib/shared/utilities/object'
import { ListScripts } from './schemas'

export async function listFromSlugs({
  slugs,
}: {
  slugs: Array<string>
}) {
  const scripts = await db
    .selectFrom('script')
    .selectAll()
    .where('slug', 'in', slugs)
    .execute()

  return scripts
}

export async function findScript({ key }: { key: string }) {
  const script = await db
    .selectFrom('script')
    .selectAll()
    .where('slug', '=', key)
    .executeTakeFirstOrThrow()

  return removeNulls({
    id: intToIdTone(script.id),
    slug: script.slug,
    name: script.name,
    category: script.category,
    is_rtl: script.is_rtl,
    is_vertical: script.is_vertical,
    iso_15924: script.iso_15924,
    iso_15924_numeric: script.iso_15924_numeric,
  })
}

export async function listScripts(source: ListScripts) {
  const input = ListScripts.parse(source)
  const counter = await db
    .selectFrom('script')
    .select(eb => eb.fn.count<number>('id').as('count'))
    .executeTakeFirstOrThrow()

  const scripts = await db
    .selectFrom('script')
    .selectAll()
    .orderBy('slug')
    .limit(input.size!)
    .offset((input.page! - 1) * input.size!)
    .execute()

  return removeNulls({
    size: counter.count,
    list: scripts.map(x => ({
      id: intToIdTone(x.id),
      slug: x.slug,
      name: x.name,
      category: x.category,
      is_rtl: x.is_rtl,
      is_vertical: x.is_vertical,
      iso_15924: x.iso_15924,
      iso_15924_numeric: x.iso_15924_numeric,
    })),
  })
}
