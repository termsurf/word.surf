import Page from '~/components/pages/languages/Page'
import { getBase } from '~/data/base'

export default async function View() {
  const languages = await getBase(`/languages?size=1000`)

  return <Page languages={languages} />
}
