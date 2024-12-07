import { NextRequest } from 'next/server'
import { getLanguage } from '~/lib/backend/queries/languages'

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ language: string }> },
) {
  const params = await context.params
  const output = await getLanguage({ slug: params.language })
  return Response.json({
    type: 'success',
    data: output,
  })
}
