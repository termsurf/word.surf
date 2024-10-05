import { sets } from '~/data/scripts/symbols'
import { addGetScript, addGetSymbols } from '~/tools/router/symbols'
import router from './router'

addGetScript(router, 'telugu', sets.telugu)
addGetSymbols(router, 'telugu', sets.telugu)
