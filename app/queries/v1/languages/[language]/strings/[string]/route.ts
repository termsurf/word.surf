import { NextRequest } from 'next/server'

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ language: string; component: string }> },
) {
  const params = await context.params
  // const output = await findLanguageString({
  //   languageKey: params.language,
  //   slug: params.component,
  // })
  // return Response.json(output)
}
