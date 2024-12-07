import { NextRequest } from 'next/server'
import { list } from '~/lib/backend/queries/fonts'

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams
  const page = parseInt(String(query.get('page') ?? '1'), 10)
  const size = parseInt(String(query.get('size') ?? '100'), 10)

  if (query.get('slugs')) {
    const slugs = String(query.get('slugs')).split(',')
    const output = await list({ page, size, slugs })
  } else {
    const output = await list({ page, size })
    return Response.json(output)
  }
}
