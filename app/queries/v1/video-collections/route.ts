import { NextRequest } from 'next/server'
import { findVideoCollections } from '~/lib/backend/queries/video-collections'

export async function POST(req: NextRequest) {
  const query = req.nextUrl.searchParams
  const paths = String(query.get('paths')).split(',')
  const output = await findVideoCollections({ paths })
  return Response.json(output)
}
