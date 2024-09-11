import { postBase } from '~/data/base'

export async function listLanguageTranslations({
  language,
  components,
}: {
  language: string
  components: Array<string>
}) {
  return await postBase(`/languages/${language}/translations`, {
    components,
  })
}
