'use client'

import Layout from '@termsurf/leaf/component/Layout'
import ErrorPage, {
  ErrorPageInput,
} from '@termsurf/leaf/component/page/ErrorPage'
import Environment from '~/lib/frontend/components/Environment'

export default function Page(props: ErrorPageInput) {
  return (
    <Environment>
      <Layout
        left={<div className="h-full w-full bg-rose-400" />}
        right={<div className="h-full w-full bg-rose-400" />}
      >
        <ErrorPage {...props} />
      </Layout>
    </Environment>
  )
}
