import { findLanguage } from '~/lib/backend/queries/languages'
import Page from '~/lib/frontend/components/pages/languages/language/lists/Page'

export type Input = {
  params: Promise<{ language: string }>
}

export default async function View(props: Input) {
  const params = await props.params
  const language = await findLanguage({ key: params.language })
  // https://github.com/keymanapp/keyboards/blob/master/release/basic/basic_kbda2/source/basic_kbda2.kmn
  return <Page language={language} />
}
