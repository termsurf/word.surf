import { User } from '@supabase/auth-js'
import { NextRequest } from 'next/server'
import kink from '~/lib/shared/settings/errors'
import supabase from '~/lib/shared/settings/supabase/client'

export async function isLoggedIn() {
  return Boolean(await getSupabaseUser())
}

export async function assumeSupabaseUser() {
  const user = await getSupabaseUser()
  assertSupabaseUser(user)
  return user
}

export function hasRequestSecret(req: NextRequest) {
  return req.headers['code'] === process.env.CODE_SURF_CODE
}

export async function getSupabaseUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error) {
    throw kink('unauthorized')
  }

  return user
}

export function assertSupabaseUser(
  user?: User | null,
): asserts user is User {
  if (!user) {
    throw kink('unauthorized')
  }
}
