import { sets } from '~/data/scripts/symbols'
import { addGetScript, addGetSymbols } from '~/tools/router/symbols'
import router from './router'

addGetScript(router, 'tifinagh', sets.tifinagh)
addGetSymbols(router, 'tifinagh', sets.tifinagh)
