import { sets } from '~/data/scripts/symbols'
import { addGetScript, addGetSymbols } from '~/tools/router/symbols'
import router from './router'

addGetScript(router, 'oriya', sets.oriya)
addGetSymbols(router, 'oriya', sets.oriya)
