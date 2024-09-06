import Page from '~/component/page/language/type/Page'
import { readBase } from '~/utility/base'

type Input = {
  params: { language: string }
}

export default async function View({ params }: Input) {
  const language = await readBase(`/languages/${params.language}`)

  return <Page language={language} />
}
