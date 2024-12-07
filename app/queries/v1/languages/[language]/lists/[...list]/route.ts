import { NextRequest } from 'next/server'
import { findLanguageList } from '~/lib/backend/queries/language-string-lists'

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ language: string }> },
) {
  const params = await context.params
  const query = req.nextUrl.searchParams
  const path = String(query.get('path'))
  const output = await findLanguageList({
    key: params.language,
    path: path,
  })
  return Response.json(output)
}
