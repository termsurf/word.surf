import startCase from 'lodash/startCase'
import toLower from 'lodash/toLower'

export const titleCase = (text: string) => startCase(toLower(text))

export function getSymbolFrequencies(text: string) {
  return text.split('').reduce((m, x) => {
    m[x] ??= 0
    m[x]++
    return m
  }, {})
}
