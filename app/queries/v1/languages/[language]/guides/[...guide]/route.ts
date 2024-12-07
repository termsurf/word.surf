import { NextRequest } from 'next/server'

export async function GET(
  req: NextRequest,
  context: {
    params: Promise<{ language: string; guide: Array<string> }>
  },
) {
  const params = await context.params
  const query = req.nextUrl.searchParams
  const isMetadata = query.get('metadata') === 'true'
  const path = `/languages/${
    params.language
  }/guides/${params.guide.join('/')}`
  console.log(path)
  // if (isMetadata) {
  //   const output = await findLanguageGuideMetadata({
  //     language: params.language,
  //     path,
  //   })
  //   return Response.json(output)
  // } else {
  //   const output = await findLanguageGuideContent({
  //     language: params.language,
  //     path,
  //   })
  //   return Response.json(output)
  // }
}
