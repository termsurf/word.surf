import omit from 'lodash/omit'
import supabase from '~/lib/shared/settings/supabase/client'
import { matchToneCode8 } from '~/lib/shared/utilities/id'
import { idToIntTone, intToIdTone } from '~/lib/shared/utilities/int'
import { db } from '~/lib/shared/utilities/kysely'
import { removeNulls } from '~/lib/shared/utilities/object'
import { GetUserId, RemoveUserProvider, UpdateUser } from './constants'

export async function updateUser(source: UpdateUser) {
  const input = UpdateUser.parse(source)

  return await db
    .updateTable('user')
    .returningAll()
    .where('id', '=', input.userId)
    .set(omit(input, ['userId']))
    .executeTakeFirstOrThrow()
}

export async function getUserIdAsInt(source: GetUserId) {
  const input = GetUserId.parse(source)

  if (matchToneCode8(input.key)) {
    return idToIntTone(input.key)
  } else {
    const user = await db
      .selectFrom('user')
      .select('id')
      .where('slug', '=', input.key)
      .executeTakeFirstOrThrow()

    return user.id
  }
}

export async function getUser(source: GetUserId) {
  const input = GetUserId.parse(source)

  if (matchToneCode8(input.key)) {
    return await db
      .selectFrom('user')
      .selectAll()
      .where('id', '=', idToIntTone(input.key))
      .executeTakeFirstOrThrow()
  } else {
    return await db
      .selectFrom('user')
      .selectAll()
      .where('slug', '=', input.key)
      .executeTakeFirstOrThrow()
  }
}

export async function getUserFromSupabaseId(source: GetUserId) {
  const input = GetUserId.parse(source)

  const user = await db
    .selectFrom('user')
    .selectAll()
    .where('supabase_id', '=', input.key)
    .executeTakeFirstOrThrow()

  return removeNulls({
    id: intToIdTone(user.id),
    slug: user.slug,
    name: user.name,
    description: user.description,
    created_at: user.created_at,
  })
}

export async function findUser(source: GetUserId) {
  const input = GetUserId.parse(source)
  const user = await getUser({ key: input.key })
  const { data, error } = await supabase
    .from('auth.identities')
    .select('provider, provider_id')
    .eq('user_id', user.supabase_id)

  if (error) {
    throw new Error('Auth error')
  }

  return {
    id: intToIdTone(user.id),
    providers: data.map(x => ({
      slug: x.provider,
      id: x.provider_id,
    })),
  }
}

export async function removeUserProvider(source: RemoveUserProvider) {
  const input = RemoveUserProvider.parse(source)
  const user = await getUser({ key: input.userKey })

  const { data, error } = await supabase
    .from('auth.identities')
    .delete()
    .match({ user_id: user.supabase_id, provider: input.providerSlug })

  if (error) {
    throw new Error('Auth error')
  }

  return
}
