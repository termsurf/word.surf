'use client'

import { P } from '@termsurf/leaf/component/Content'
import Layout from '@termsurf/leaf/component/Layout'
import BaseNotFoundPage from '@termsurf/leaf/component/page/NotFoundPage'
import Environment from '~/lib/frontend/components/Environment'

export default function NotFoundPage() {
  return (
    <Environment>
      <Layout
        left={<Layout.Side color="red" />}
        right={<Layout.Side color="red" />}
      >
        <BaseNotFoundPage>
          <P
            align="center"
            type="secondary"
          >
            Can't seem to find this page, or maybe we don't have it.
          </P>
        </BaseNotFoundPage>
      </Layout>
    </Environment>
  )
}
