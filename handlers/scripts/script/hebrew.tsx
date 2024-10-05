import { sets } from '~/data/scripts/symbols'
import { addGetScript, addGetSymbols } from '~/tools/router/symbols'
import router from './router'

addGetScript(router, 'hebrew', sets.hebrew)
addGetSymbols(router, 'hebrew', sets.hebrew)
