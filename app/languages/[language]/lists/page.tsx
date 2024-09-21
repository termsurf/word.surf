import Page from '~/components/pages/languages/language/lists/Page'
import { findLanguage } from '~/data/base/languages'

type Input = {
  params: { language: string }
}

export default async function View({ params }: Input) {
  const language = await findLanguage(params)

  return <Page language={language} />
}
