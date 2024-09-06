'use client'

import type { ErrorPageInput } from '@termsurf/leaf/component/page/ErrorPage'

import GlobalErrorPage from '~/page/global-error/Page'

export default function Page(props: ErrorPageInput) {
  return <GlobalErrorPage {...props} />
}
