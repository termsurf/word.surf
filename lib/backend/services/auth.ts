import { NextRequest } from 'next/server'

export function hasRequestSecret(req: NextRequest) {
  return req.headers['code'] === process.env.CODE_SURF_CODE
}
