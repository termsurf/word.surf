import { NextRequest } from 'next/server'
import { createPage, updatePage } from '~/lib/backend/queries/pages'

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ path: Array<string> }> },
) {
  const params = await context.params
  // const output = await findLanguage({ key: params.language })
  // return Response.json(output)
}

export async function POST(req: NextRequest) {
  const source = await req.json()
  const output = await createPage(source)
  return Response.json(output)
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const params = await context.params
  const source = await req.json()
  const output = await updatePage(params.id, source)
  return Response.json(output)
  // const output = await findLanguage({ key: params.language })
  // return Response.json(output)
}
