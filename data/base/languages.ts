import { getBase } from '~/data/base'

export async function findLanguage({ language }: { language: string }) {
  return await getBase(`/languages/${language}`)
}
