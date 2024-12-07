import Kink from '@termsurf/kink'

const host = '@termsurf/word.surf'

type Base = {
  system_error: {
    take: {}
  }
  unauthorized: {
    take: {}
  }
  forbidden: {
    take: {
      reason?: string
    }
  }
  rate_limited: {
    take: {
      reason: string
    }
  }
  no_bots: {
    take: {
      reason: string
    }
  }
}

type Name = keyof Base

Kink.base(
  host,
  'system_error',
  (take: Base['system_error']['take']) => ({
    code: 1,
    link: take,
    note: 'System error',
    siteCode: 401,
  }),
)

Kink.base(
  host,
  'unauthorized',
  (take: Base['unauthorized']['take']) => ({
    code: 2,
    link: take,
    note: 'Unauthorized',
    siteCode: 401,
  }),
)

Kink.base(host, 'forbidden', (take: Base['forbidden']['take']) => ({
  code: 3,
  link: take,
  note: 'Forbidden',
  siteCode: 403,
}))

Kink.base(
  host,
  'rate_limited',
  (take: Base['rate_limited']['take']) => ({
    code: 4,
    link: take,
    note: 'Too many requests',
    siteCode: 429,
  }),
)

Kink.base(host, 'no_bots', (take: Base['no_bots']['take']) => ({
  code: 5,
  link: take,
  note: 'No bots allowed',
  siteCode: 403,
}))

Kink.code(host, (code: number) => code.toString(16).padStart(4, '0'))

export default function kink<N extends Name>(
  form: N,
  take?: Base[N]['take'],
) {
  return Kink.make(host, form, take)
}
