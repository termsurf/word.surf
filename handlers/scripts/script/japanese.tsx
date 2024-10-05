import { sets } from '~/data/scripts/symbols'
import { addGetScript, addGetSymbols } from '~/tools/router/symbols'
import router from './router'

addGetScript(router, 'japanese', sets.japanese)
addGetSymbols(router, 'japanese', sets.japanese)
