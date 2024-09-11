import Page from '~/components/pages/languages/language/components/Page'
import { getBase } from '~/data/base'
import { findLanguage } from '~/data/base/languages'

type Properties = {
  params: { language: string }
}

export default async function View({ params }: Properties) {
  const language = await findLanguage(params)
  const { components } = await getBase(
    `/languages/${params.language}/components`,
  )

  return (
    <Page
      language={language}
      components={components}
    />
  )
}
