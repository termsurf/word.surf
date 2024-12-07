import { sets } from '~/lib/shared/constants/scripts/symbols'
import {
  addGetScript,
  addGetSymbols,
} from '~/lib/shared/utilities/router/symbols'
import router from './router'

addGetScript(router, 'ugaritic', sets.ugaritic)
addGetSymbols(router, 'ugaritic', sets.ugaritic)
