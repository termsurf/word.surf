import startCase from 'lodash/startCase'
import toLower from 'lodash/toLower'

export const titleCase = (text: string) => startCase(toLower(text))
