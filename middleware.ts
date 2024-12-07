import { NextResponse, type NextRequest } from 'next/server'
import { protect } from '~/lib/backend/services/arcjet'

export async function middleware(request: NextRequest) {
  try {
    await protect(request, { requested: 1 })
  } catch (e) {
    return NextResponse.rewrite(new URL('/rate-limited', request.url))
  }

  const response = NextResponse.next({ request })
  // await updateSession()
  // const fetched = await fetch('https://word.surf/bind', {
  //   method: 'GET',
  //   headers: {
  //     'content-type': 'application/json',
  //   },
  //   credentials: 'include', // Ensures cookies are received
  // })

  // const setCookies = setCookie.parse(fetched)

  // // Forward the cookie to the client
  // if (setCookies) {
  //   // const cookieStore = await cookies()
  //   for (const cookie of setCookies) {
  //     const options: any = {}
  //     for (const name in cookie) {
  //       if (name === 'name' || name === 'value') {
  //         continue
  //       }
  //       options[name] = cookie[name]
  //     }
  //     response.cookies.set(cookie.name, cookie.value, options)
  //   }
  // }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
