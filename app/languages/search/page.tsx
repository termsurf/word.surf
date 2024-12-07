import { listLanguages } from '~/lib/backend/queries/languages'
import Page from '~/lib/frontend/components/pages/languages/search/Page'

export const dynamic = 'force-dynamic'

export default async function View() {
  const response = await listLanguages({ size: 1000, page: 1 })
  return <Page state={response.data} />
}
