import { NextRequest } from 'next/server'
import { findLanguage } from '~/lib/backend/queries/languages'

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ language: string }> },
) {
  const params = await context.params
  const output = await findLanguage({ key: params.language })
  return Response.json(output)
}

export const dynamic = 'force-dynamic'
