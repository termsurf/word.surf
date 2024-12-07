import { findLanguage } from '~/lib/backend/queries/languages'
import Page from '~/lib/frontend/components/pages/languages/language/Page'

type Input = {
  params: Promise<{ language: string }>
}

export default async function View(props: Input) {
  const params = await props.params
  const language = await findLanguage({ key: params.language })

  return (
    <Page
      language={language}
      items={[]}
    />
  )
}
