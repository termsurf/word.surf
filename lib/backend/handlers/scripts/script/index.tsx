import { matchPagePath } from '~/lib/shared/utilities/router/page'
import router from './router'

import './arabic'
import './armenian'
import './avestan'
import './bengali'
import './buginese'
import './burmese'
import './canadian'
import './cherokee'
import './chinese'
import './coptic'
import './cuneiform'
import './cyrillic'
import './devanagari'
import './egyptian'
import './geez'
import './georgian'
import './gothic'
import './greek'
import './gurmukhi'
import './hebrew'
import './hiragana'
import './japanese'
import './javanese'
import './kannada'
import './katakana'
import './khmer'
import './korean'
import './lao'
import './latin'
import './linearA'
import './linearB'
import './malayalam'
import './mandaic'
import './ogham'
import './old-italic'
import './oriya'
import './phoenician'
import './runic'
import './sinhala'
import './syriac'
import './tamil'
import './telugu'
import './thaana'
import './thai'
import './tibetan'
import './tifinagh'
import './ugaritic'
import './vai'

type Input = {
  params: Promise<{ script: string; path?: Array<string> }>
}

export function renderPage(path: string) {
  return matchPagePath(router, path)?.page()
}

export async function generateMetadata({ params }: Input) {
  const p = await params
  const path = p.path
    ? `/${p.script}/${p.path.join('/')}`
    : `/${p.script}`

  return matchPagePath(router, path)?.metadata?.()
}
