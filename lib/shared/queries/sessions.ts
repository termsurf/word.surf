import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
// import { patchBase } from '.'

export async function updateSession() {
  const cookieStore = await cookies()
  const requestCookies = await cookieStore.getAll()
  // const { type, cookies: responseCookies } = await patchBase(
  //   `/sessions`,
  //   {
  //     cookies: requestCookies,
  //   },
  // )
  // switch (type) {
  //   case 'error':
  //     break
  //   case 'redirect':
  //     break
  //   default:
  //     await writeCookies(cookieStore, responseCookies)
  // }
}

export type HandleProviderCallback = {
  url: string
  provider: string
  code: string | null
  next: string
}

export async function handleProviderCallback({
  url,
  provider,
  code,
  next,
}: HandleProviderCallback) {
  if (!code) {
    const { origin } = new URL(url)
    NextResponse.redirect(`${origin}/authentications/error`)
  }

  const cookieStore = await cookies()
  const requestCookies = await cookieStore.getAll()

  const res = await fetch(
    `https://base.word.surf/authentications/${provider}/callback`,
    {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ cookies: requestCookies, code, next }),
    },
  )

  const json = await res.json()

  const responseCookies = json.cookies as Array<ResponseCookie>
  await writeCookies(cookieStore, responseCookies)

  switch (json.type) {
    case 'redirect': {
      return NextResponse.redirect(json.path)
    }
  }
}

export async function writeCookies(
  cookieStore: ReadonlyRequestCookies,
  responseCookies: Array<ResponseCookie>,
) {
  for (const cookie of responseCookies) {
    const options: any = {}
    for (const name in cookie) {
      if (name === 'name' || name === 'value') {
        continue
      }
      options[name] = cookie[name]
    }
    cookieStore.set(cookie.name, cookie.value, options)
  }
}
