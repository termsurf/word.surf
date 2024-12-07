import Kink from '@termsurf/kink'
import { NextRequest, NextResponse } from 'next/server'
import kink from '~/lib/shared/settings/errors'

export type Method =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'DELETE'
  | 'HEAD'

export type Params = Record<string, string | string[]>

export type Context<T> = { params: Promise<T> }

type Handler<T extends Params = Params> = (
  req: NextRequest,
  context: Context<T>,
) => Promise<any> | any

export function handle<T extends Params = Params>(handler: Handler<T>) {
  return async function respond(req: NextRequest, context: Context<T>) {
    try {
      const output = await handler(req, context)
      return NextResponse.json(output ?? {})
    } catch (e) {
      if (e instanceof Kink) {
        const error = {
          type: 'error',
          message: e.note,
          code: e.code,
        }
        if (e.siteCode) {
          return NextResponse.json(error, {
            status: e.siteCode,
          })
        } else {
          return NextResponse.json(error, {
            status: 500,
          })
        }
      }
    }

    const error = kink('system_error')
    return NextResponse.json(
      {
        type: 'error',
        message: error.note,
        code: error.code,
      },
      {
        status: 500,
      },
    )
  }
}
