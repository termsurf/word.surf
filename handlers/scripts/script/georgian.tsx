import { sets } from '~/data/scripts/symbols'
import { addGetScript, addGetSymbols } from '~/tools/router/symbols'
import router from './router'

addGetScript(router, 'georgian', sets.georgian)
addGetSymbols(router, 'georgian', sets.georgian)
