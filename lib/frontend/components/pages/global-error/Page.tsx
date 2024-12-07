'use client'

import Layout from '@termsurf/leaf/component/Layout'
import type { ErrorPageInput } from '@termsurf/leaf/component/page/ErrorPage'
import BaseGlobalErrorPage from '@termsurf/leaf/component/page/GlobalErrorPage'
import Environment from '~/lib/frontend/components/Environment'

export default function GlobalErrorPage({
  error,
  reset,
}: ErrorPageInput) {
  return (
    <Environment>
      <Layout
        left={<Layout.Side color="red" />}
        right={<Layout.Side color="red" />}
      >
        <BaseGlobalErrorPage
          error={error}
          reset={reset}
        />
      </Layout>
    </Environment>
  )
}
