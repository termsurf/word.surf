import { NextRequest } from 'next/server'
import {
  getUserFromSupabaseId,
  updateUser,
} from '~/lib/backend/queries/users'
import { assumeSupabaseUser } from '~/lib/shared/settings/auth'
import kink from '~/lib/shared/settings/errors'
import { handle } from '~/lib/shared/utilities/handler'

export const GET = handle(async (req: NextRequest) => {
  const metaUser = await assumeSupabaseUser()
  const user = await getUserFromSupabaseId({ key: metaUser.id })
  return user
})

export const PATCH = handle(async (req: NextRequest) => {
  const metaUser = await assumeSupabaseUser()
  const user = await getUserFromSupabaseId({ key: metaUser.id })
  const updatedUser = await req.json()
  if (user.id !== updatedUser.id) {
    throw kink('forbidden')
  }
  return await updateUser(updatedUser)
})

export const DELETE = handle(async (req: NextRequest) => {
  const metaUser = await assumeSupabaseUser()
  const user = await getUserFromSupabaseId({ key: metaUser.id })
  const updatedUser = await req.json()
  if (user.id !== updatedUser.id) {
    throw kink('forbidden')
  }
  // return await DeleteUser(updatedUser)
})
