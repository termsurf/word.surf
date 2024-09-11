import Page from '~/components/pages/languages/language/components/component/Page'
import { getBase } from '~/data/base'
import { findLanguage } from '~/data/base/languages'

type Properties = {
  params: { language: string; component: string }
}

export default async function View({ params }: Properties) {
  const language = await findLanguage(params)
  const component = await getBase(
    `/languages/${params.language}/components/${params.component}`,
  )

  return (
    <Page
      language={language}
      component={component}
    />
  )
}
