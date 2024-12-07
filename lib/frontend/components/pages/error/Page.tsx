import Layout from '@termsurf/leaf/component/Layout'
import BaseErrorPage, {
  ErrorPageInput,
} from '@termsurf/leaf/component/page/ErrorPage'
import Environment from '~/lib/frontend/components/Environment'

export default function ErrorPage({ error, reset }: ErrorPageInput) {
  return (
    <Environment>
      <Layout
        left={<Layout.Side color="red" />}
        right={<Layout.Side color="red" />}
      >
        <BaseErrorPage
          error={error}
          reset={reset}
        />
      </Layout>
    </Environment>
  )
}
