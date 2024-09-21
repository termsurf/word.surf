import Page from '~/components/pages/languages/language/Page'
import { getBase } from '~/data/base'
import { findLanguageList } from '~/data/base/language-lists'

type Input = {
  params: { language: string }
}

export default async function View({ params }: Input) {
  const language = await getBase(`/languages/${params.language}`)
  const { items } = await findLanguageList({
    language: params.language,
    path: 'noun/small',
  })

  return (
    <Page
      language={language}
      items={items}
    />
  )
}
