import { sets } from '~/data/scripts/symbols'
import { addGetScript, addGetSymbols } from '~/tools/router/symbols'
import router from './router'

addGetScript(router, 'geez', sets.geez)
addGetSymbols(router, 'geez', sets.geez)
