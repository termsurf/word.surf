import { getBase } from '.'

export async function findLanguageList({
  language,
  path,
}: {
  language: string
  path: string
}) {
  return await getBase(`/languages/${language}/lists?path=${path}`)
}
