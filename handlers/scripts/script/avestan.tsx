import { sets } from '~/data/scripts/symbols'
import { addGetScript, addGetSymbols } from '~/tools/router/symbols'
import router from './router'

addGetScript(router, 'avestan', sets.avestan)
addGetSymbols(router, 'avestan', sets.avestan)
