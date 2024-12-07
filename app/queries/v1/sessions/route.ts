import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { NextResponse, type NextRequest } from 'next/server'
import Cookies from '~/lib/shared/settings/supabase/cookies'
import { createClient } from '~/lib/shared/settings/supabase/server'

export async function PATCH(request: NextRequest) {
  try {
    const cookies = (await request.json()) as Array<RequestCookie>
    const store = new Cookies(cookies)
    const supabase = await createClient(store)

    // IMPORTANT: Avoid writing any logic between createServerClient and
    // supabase.auth.getUser(). A simple mistake could make it very hard to debug
    // issues with users being randomly logged out.

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (
        !user &&
        !request.nextUrl.pathname.startsWith('/login') &&
        !request.nextUrl.pathname.startsWith('/auth')
      ) {
        // no user, potentially respond by redirecting the user to the login page
        const url = request.nextUrl.clone()
        url.pathname = '/login'

        return NextResponse.json({
          type: 'redirect',
          path: url.toString(),
        })
      }
      return NextResponse.json({ cookies: store.getOutput() })
    } catch (e) {
      console.log(e)
      return NextResponse.json({
        type: 'error',
        message: 'System error',
      })
    }

    // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
    // creating a new response object with NextResponse.next() make sure to:
    // 1. Pass the request in it, like so:
    //    const myNewResponse = NextResponse.next({ request })
    // 2. Copy over the cookies, like so:
    //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
    // 3. Change the myNewResponse object to fit your needs, but avoid changing
    //    the cookies!
    // 4. Finally:
    //    return myNewResponse
    // If this is not done, you may be causing the browser and server to go out
    // of sync and terminate the user's session prematurely!
  } catch (e) {
    console.log(e)
    return NextResponse.json({
      type: 'error',
      message: 'System error',
    })
  }
}
