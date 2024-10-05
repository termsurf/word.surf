import { sets } from '~/data/scripts/symbols'
import { addGetScript, addGetSymbols } from '~/tools/router/symbols'
import router from './router'

addGetScript(router, 'gothic', sets.gothic)
addGetSymbols(router, 'gothic', sets.gothic)
