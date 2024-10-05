import { sets } from '~/data/scripts/symbols'
import { addGetScript, addGetSymbols } from '~/tools/router/symbols'
import router from './router'

addGetScript(router, 'cherokee', sets.cherokee)
addGetSymbols(router, 'cherokee', sets.cherokee)
