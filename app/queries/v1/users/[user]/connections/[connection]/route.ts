import { NextRequest } from 'next/server'
import {
  getUserFromSupabaseId,
  removeUserProvider,
} from '~/lib/backend/queries/users'
import { protectAdmin } from '~/lib/shared/settings/arcjet'
import { assumeSupabaseUser } from '~/lib/shared/settings/auth'
import { handle } from '~/lib/shared/utilities/handler'

export const DELETE = handle(
  async (
    req: NextRequest,
    context: { params: Promise<{ connection: string }> },
  ) => {
    const params = await context.params
    const metaUser = await assumeSupabaseUser()
    const user = await getUserFromSupabaseId({ key: metaUser.id })
    await protectAdmin(req, { userId: user.id, requested: 1 })
    await removeUserProvider({
      userKey: user.id,
      providerSlug: params.connection,
    })
  },
)
