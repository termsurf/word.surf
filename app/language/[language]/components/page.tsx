import Page from '~/component/page/language/type/components/Page'
import { readBase } from '~/utility/base'

type Properties = {
  params: { language: string }
}

export default async function View({ params }: Properties) {
  const language = await readBase(`/languages/${params.language}`)
  const components = await readBase(
    `/languages/${params.language}/components`,
  )

  return (
    <Page
      language={language}
      components={components}
    />
  )
}
