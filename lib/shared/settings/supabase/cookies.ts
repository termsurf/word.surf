import { CookieOptions } from '@supabase/ssr'
import {
  RequestCookie,
  ResponseCookie,
} from 'next/dist/compiled/@edge-runtime/cookies'

export default class Cookies {
  private input: Array<RequestCookie>
  private output: Array<ResponseCookie>

  constructor(input: Array<RequestCookie> = []) {
    this.input = input
    this.output = []
  }

  getInput() {
    return this.input
  }

  setOutput(
    cookies: {
      name: string
      value: string
      options: CookieOptions
    }[],
  ) {
    const output: Array<ResponseCookie> = []
    for (const cookie of cookies) {
      output.push({
        name: cookie.name,
        value: cookie.value,
        ...cookie.options,
      })
    }
    this.output = output
  }

  getOutput() {
    return this.output
  }
}
