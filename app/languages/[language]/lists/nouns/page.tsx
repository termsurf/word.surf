import Page from '~/components/pages/languages/language/Page'
import { findLanguage } from '~/data/base/languages'

type Input = {
  params: { language: string }
}

export default async function View({ params }: Input) {
  const language = await findLanguage(params)
  // const lists = await mapLanguageLists({
  //   small: '/nouns/small',
  //   medium: '/nouns/medium',
  //   large: '/nouns/large',
  // })

  return <Page language={language} />
}
