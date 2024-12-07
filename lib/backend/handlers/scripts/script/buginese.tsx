import { sets } from '~/lib/shared/constants/scripts/symbols'
import {
  addGetScript,
  addGetSymbols,
} from '~/lib/shared/utilities/router/symbols'
import router from './router'

addGetScript(router, 'buginese', sets.buginese)
addGetSymbols(router, 'buginese', sets.buginese)
