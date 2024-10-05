import { sets } from '~/data/scripts/symbols'
import { addGetScript, addGetSymbols } from '~/tools/router/symbols'
import router from './router'

addGetScript(router, 'linear-b', sets.linearB)
addGetSymbols(router, 'linear-b', sets.linearB)
