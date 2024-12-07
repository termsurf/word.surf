import { NextRequest } from 'next/server'
import { findRecordingCollections } from '~/lib/backend/queries/audio-collections'

export async function POST(req: NextRequest) {
  const query = req.nextUrl.searchParams
  const paths = String(query.get('paths')).split(',')
  const output = await findRecordingCollections({ paths })
  return Response.json(output)
}
