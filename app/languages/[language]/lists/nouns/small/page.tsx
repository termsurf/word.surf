import Page from '~/components/pages/languages/language/lists/nouns/small/Page'
import { mapImages } from '~/data/base/images'
import { findLanguageList } from '~/data/base/language-lists'
import { findLanguage } from '~/data/base/languages'
import * as IMAGES from '~/data/images'

type Input = {
  params: { language: string }
}

export default async function View({ params }: Input) {
  const language = await findLanguage(params)
  const images = await mapImages(IMAGES.SMALL)
  const { path, items, languages } = await findLanguageList({
    language: params.language,
    path: 'noun/small',
  })

  return (
    <Page
      language={language}
      languages={languages}
      items={items}
      images={images}
    />
  )
}
