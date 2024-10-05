import { sets } from '~/data/scripts/symbols'
import { addGetScript, addGetSymbols } from '~/tools/router/symbols'
import router from './router'

addGetScript(router, 'tibetan', sets.tibetan)
addGetSymbols(router, 'tibetan', sets.tibetan)
