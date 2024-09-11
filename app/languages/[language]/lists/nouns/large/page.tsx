import Page from '~/components/pages/languages/language/lists/nouns/large/Page'
import { findLanguageList } from '~/data/base/language-lists'
import { findLanguage } from '~/data/base/languages'

type Input = {
  params: { language: string }
}

export default async function View({ params }: Input) {
  const language = await findLanguage(params)
  const { path, items, languages } = await findLanguageList({
    language: params.language,
    path: 'noun/large',
  })

  return (
    <Page
      language={language}
      items={items}
      languages={languages}
      // translations={translations}
    />
  )
}
