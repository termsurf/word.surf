import { matchPagePath } from '~/tools/router/page'
import router from './router'

import './arabic'
import './avestan'
import './bengali'
import './buginese'
import './canadian'
import './cherokee'
import './devanagari'
import './geez'
import './georgian'
import './gothic'
import './gurmukhi'
import './hebrew'
import './japanese'
import './kannada'
import './linearA'
import './linearB'
import './malayalam'
import './mandaic'
import './oriya'
import './tamil'
import './telugu'
import './tibetan'
import './tifinagh'
import './ugaritic'

type Input = {
  params: { script: string; path?: Array<string> }
}

export function renderPage(path: string) {
  return matchPagePath(router, path)?.page()
}

export function generateMetadata({ params }: Input) {
  const path = params.path
    ? `/${params.script}/${params.path.join('/')}`
    : `/${params.script}`

  return matchPagePath(router, path)?.metadata?.()
}
