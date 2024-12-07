import { NextRequest } from 'next/server'

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ language: string }> },
) {
  const params = await context.params
  const query = req.nextUrl.searchParams
  const role = query.get('role') ? String(query.get('role')) : undefined
  const page = parseInt(String(query.get('page') ?? '1'), 10)
  const size = parseInt(String(query.get('size') ?? '100'), 10)
  // const output = await listLanguageStringsByLanguage({
  //   page,
  //   size,
  //   // role,
  //   languageKey: params.language,
  // })
  // return Response.json(output)
}
