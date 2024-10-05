import { sets } from '~/data/scripts/symbols'
import { addGetScript, addGetSymbols } from '~/tools/router/symbols'
import router from './router'

addGetScript(router, 'mandaic', sets.mandaic)
addGetSymbols(router, 'mandaic', sets.mandaic)
