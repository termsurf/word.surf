import { sets } from '~/data/scripts/symbols'
import { addGetScript, addGetSymbols } from '~/tools/router/symbols'
import router from './router'

addGetScript(router, 'bengali', sets.bengali)
addGetSymbols(router, 'bengali', sets.bengali)
