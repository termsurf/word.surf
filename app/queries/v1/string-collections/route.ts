import { NextRequest } from 'next/server'
import { listLanguageStringsByCollectionSlugs } from '~/lib/backend/queries/string-collections'

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ user: string }> },
) {
  const params = await context.params
  const query = req.nextUrl.searchParams
  const slugs = String(query.get('slugs')).split(',')
  // const isMap = String(query.get('slugs')).split(',')
  const output = await listLanguageStringsByCollectionSlugs({
    userKey: params.user,
    slugs,
  })
  return Response.json(output)
}

export const GET = POST
