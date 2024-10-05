import { sets } from '~/data/scripts/symbols'
import { addGetScript, addGetSymbols } from '~/tools/router/symbols'
import router from './router'

addGetScript(router, 'tamil', sets.tamil)
addGetSymbols(router, 'tamil', sets.tamil)
