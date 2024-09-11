import Page from '~/components/pages/languages/language/Page'
import { listLanguageTranslations } from '~/data/base/language-translations'
import { findLanguage } from '~/data/base/languages'

type Input = {
  params: { language: string }
}

export default async function View({ params }: Input) {
  const language = await findLanguage(params)
  const translations = await listLanguageTranslations({
    language,
    components: ['rock', 'leaf'],
  })

  return (
    <Page
      language={language}
      // translations={translations}
    />
  )
}
