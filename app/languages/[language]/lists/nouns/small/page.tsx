import Page from '~/components/pages/languages/language/Page'
import { mapImages } from '~/data/base/images'
import { listLanguageTranslations } from '~/data/base/language-translations'
import { findLanguage } from '~/data/base/languages'
import * as IMAGES from '~/data/images'
import * as LANGUAGE_COMPONENTS from '~/data/language-components'

type Input = {
  params: { language: string }
}

export default async function View({ params }: Input) {
  const language = await findLanguage(params)
  const images = await mapImages(IMAGES.SMALL)
  const translations = await listLanguageTranslations({
    language,
    components: LANGUAGE_COMPONENTS.SMALL,
  })

  return (
    <Page
      language={language}
      // images={images}
      // translations={translations}
    />
  )
}
