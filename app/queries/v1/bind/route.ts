import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  // Create a response object with data
  const response = NextResponse.json({ success: true })

  // Set CORS headers to allow requests from https://siteA.com
  response.headers.set(
    'Access-Control-Allow-Origin',
    'https://word.surf',
  )
  response.headers.set('Access-Control-Allow-Credentials', 'true')
  response.headers.set(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS',
  )
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type')

  // Set the cookie with required attributes for cross-origin sharing
  const cook = await cookies()

  cook.set({
    name: 'surf',
    value: process.env.CODE_SURF_CODE!,
    path: '/',
    domain: 'word.surf', // Only necessary if you want the cookie for base.word.surf
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  })

  return response
}

export async function OPTIONS() {
  const response = new NextResponse(null, { status: 204 })
  response.headers.set(
    'Access-Control-Allow-Origin',
    'https://word.surf',
  )
  response.headers.set('Access-Control-Allow-Credentials', 'true')
  response.headers.set(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS',
  )
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type')
  return response
}
