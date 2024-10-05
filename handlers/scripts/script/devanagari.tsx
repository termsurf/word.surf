import { sets } from '~/data/scripts/symbols'
import { addGetScript, addGetSymbols } from '~/tools/router/symbols'
import router from './router'

addGetScript(router, 'devanagari', sets.devanagari)
addGetSymbols(router, 'devanagari', sets.devanagari)
