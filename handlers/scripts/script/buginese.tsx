import { sets } from '~/data/scripts/symbols'
import { addGetScript, addGetSymbols } from '~/tools/router/symbols'
import router from './router'

addGetScript(router, 'buginese', sets.buginese)
addGetSymbols(router, 'buginese', sets.buginese)
