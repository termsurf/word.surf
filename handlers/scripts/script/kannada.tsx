import { sets } from '~/data/scripts/symbols'
import { addGetScript, addGetSymbols } from '~/tools/router/symbols'
import router from './router'

addGetScript(router, 'kannada', sets.kannada)
addGetSymbols(router, 'kannada', sets.kannada)
