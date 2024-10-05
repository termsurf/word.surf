import { sets } from '~/data/scripts/symbols'
import { addGetScript, addGetSymbols } from '~/tools/router/symbols'
import router from './router'

addGetScript(router, 'ugaritic', sets.ugaritic)
addGetSymbols(router, 'ugaritic', sets.ugaritic)
