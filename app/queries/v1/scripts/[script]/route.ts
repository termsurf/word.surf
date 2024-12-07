import { NextRequest } from 'next/server'
import { findScript } from '~/lib/backend/queries/scripts'

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ script: string }> },
) {
  const params = await context.params
  const output = await findScript({ key: params.script })
  return Response.json(output)
}
