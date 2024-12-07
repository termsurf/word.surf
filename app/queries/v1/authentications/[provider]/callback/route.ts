import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { type NextRequest } from 'next/server'
import { protectNonUser } from '~/lib/shared/settings/arcjet'
import kink from '~/lib/shared/settings/errors'
import Cookies from '~/lib/shared/settings/supabase/cookies'
import { createClient } from '~/lib/shared/settings/supabase/server'
import { handle } from '~/lib/shared/utilities/handler'

type AuthenticationsProviderCallback = {
  cookies: Array<RequestCookie>
  code: string
  next: string
}

export const PATCH = handle(async (request: NextRequest) => {
  await protectNonUser(request, { requested: 1 })

  const { cookies, code, next } =
    (await request.json()) as AuthenticationsProviderCallback
  const store = new Cookies(cookies)
  const supabase = await createClient(store)

  const { error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    throw kink('unauthorized')
  }

  const forwardedHost = request.headers.get('x-forwarded-host') // original origin before load balancer
  const isLocalEnv = process.env.NODE_ENV === 'development'

  if (isLocalEnv) {
    // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
    return {
      type: 'redirect',
      path: `${origin}${next}`,
      cookies: store.getOutput(),
    }
  } else if (forwardedHost) {
    return {
      type: 'redirect',
      path: `https://${forwardedHost}${next}`,
      cookies: store.getOutput(),
    }
  } else {
    return {
      type: 'redirect',
      path: `${origin}${next}`,
      cookies: store.getOutput(),
    }
  }
})
