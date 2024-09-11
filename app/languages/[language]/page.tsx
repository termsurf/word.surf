import Page from '~/components/pages/languages/language/Page'
import { getBase } from '~/data/base'

type Input = {
  params: { language: string }
}

export default async function View({ params }: Input) {
  const language = await getBase(`/languages/${params.language}`)

  return <Page language={language} />
}
