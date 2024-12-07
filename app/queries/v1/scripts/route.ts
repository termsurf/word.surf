import { NextRequest } from 'next/server'
import { listScripts } from '~/lib/backend/queries/scripts'

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams
  const page = parseInt(String(query.get('page') ?? '1'), 10)
  const size = parseInt(String(query.get('size') ?? '100'), 10)

  const output = await listScripts({ page, size })
  return Response.json(output)
}

export const dynamic = 'force-dynamic'
