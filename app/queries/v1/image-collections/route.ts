import { NextRequest } from 'next/server'
import {
  batchSaveImageCollection,
  findImageCollectionsBySlugs,
} from '~/lib/backend/queries/image-collections'
import { getUserFromSupabaseId } from '~/lib/backend/queries/users'
import { protectAdmin } from '~/lib/shared/settings/arcjet'
import { assumeSupabaseUser } from '~/lib/shared/settings/auth'

export async function GET(req: NextRequest) {
  // const metaUser = await assumeSupabaseUser()
  // const user = await getUserFromSupabaseId({ key: metaUser.id })
  // await protectNonAdmin(req, { userId: user.id, requested: 1 })

  const query = req.nextUrl.searchParams
  const paths = String(query.get('paths')).split(',')
  const output = await findImageCollectionsBySlugs({ paths })
  return Response.json(output)
}

export async function PATCH(req: NextRequest) {
  const metaUser = await assumeSupabaseUser()
  const user = await getUserFromSupabaseId({ key: metaUser.id })
  await protectAdmin(req, { userId: user.id, requested: 1 })
  const collection = await req.json()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return await batchSaveImageCollection(collection)
}
