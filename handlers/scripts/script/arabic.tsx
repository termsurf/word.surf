import { sets } from '~/data/scripts/symbols'
import { addGetScript, addGetSymbols } from '~/tools/router/symbols'
import router from './router'

addGetScript(router, 'arabic', sets.arabic)
addGetSymbols(router, 'arabic', sets.arabic)
