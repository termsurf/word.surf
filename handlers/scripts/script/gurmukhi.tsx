import { sets } from '~/data/scripts/symbols'
import { addGetScript, addGetSymbols } from '~/tools/router/symbols'
import router from './router'

addGetScript(router, 'gurmukhi', sets.gurmukhi)
addGetSymbols(router, 'gurmukhi', sets.gurmukhi)
