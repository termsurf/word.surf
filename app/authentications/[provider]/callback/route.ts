import { NextRequest } from 'next/server'
import { handleProviderCallback } from '~/lib/shared/queries/sessions'

type Props = {
  params: Promise<{
    provider: string
  }>
}

export async function GET(request: NextRequest, props: Props) {
  const params = await props.params
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  await handleProviderCallback({
    url: request.url,
    provider: params.provider,
    code,
    next,
  })
}
