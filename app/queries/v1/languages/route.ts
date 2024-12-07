import { NextRequest } from 'next/server'
import {
  createLanguage,
  listLanguages,
} from '~/lib/backend/queries/languages'

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams
  const page = parseInt(String(query.get('page') ?? '1'), 10)
  const size = parseInt(String(query.get('size') ?? '100'), 10)

  if (query.get('category')) {
    const category = String(query.get('category'))
    const output = await listLanguages({ page, size, category })
    return Response.json(output)
  } else {
    const output = await listLanguages({ page, size })
    return Response.json(output)
  }
}

export async function POST(req: NextRequest) {
  const insert = await req.json()
  const output = await createLanguage(insert)
  return Response.json(output)
}

// export async function PATCH(req: NextRequest) {
//   const upsert = await req.json()

//   if (upsert.id) {
//     const output = await update(upsert)
//     return Response.json(output)
//   } else {
//     const output = await create(upsert)
//     return Response.json(output)
//   }
// }
