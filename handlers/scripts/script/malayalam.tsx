import { sets } from '~/data/scripts/symbols'
import { addGetScript, addGetSymbols } from '~/tools/router/symbols'
import router from './router'

addGetScript(router, 'malayalam', sets.malayalam)
addGetSymbols(router, 'malayalam', sets.malayalam)
