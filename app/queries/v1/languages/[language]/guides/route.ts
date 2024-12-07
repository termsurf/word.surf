import { NextRequest } from 'next/server'

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ language: string }> },
) {
  const params = await context.params
  const query = req.nextUrl.searchParams
  const isMetadata = query.get('metadata') === 'true'
  // if (isMetadata) {
  //   const output = await findLanguageGuideMetadata({
  //     language: params.language,
  //     path: `/languages/${params.language}/guides`,
  //   })
  //   return Response.json(output)
  // } else {
  //   const output = await findLanguageGuideContent({
  //     language: params.language,
  //     path: `/languages/${params.language}/guides`,
  //   })
  //   return Response.json(output)
  // }
}
