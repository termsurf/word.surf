import { sets } from '~/data/scripts/symbols'
import { addGetScript, addGetSymbols } from '~/tools/router/symbols'
import router from './router'

addGetScript(router, 'linear-a', sets.linearA)
addGetSymbols(router, 'linear-a', sets.linearA)
