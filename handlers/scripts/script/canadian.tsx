import { sets } from '~/data/scripts/symbols'
import { addGetScript, addGetSymbols } from '~/tools/router/symbols'
import router from './router'

addGetScript(router, 'canadian', sets.canadian)
addGetSymbols(router, 'canadian', sets.canadian)
