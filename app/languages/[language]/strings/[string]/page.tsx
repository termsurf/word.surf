import { getLanguageString } from '~/lib/backend/queries/language-strings'

type Properties = {
  params: Promise<{ language: string; string: string }>
}

export default async function View(props: Properties) {
  const params = await props.params
  const response = await getLanguageString({
    language: { slug: params.language },
    string: { text: params.string },
  })

  // return (
  //   <Page
  //     language={language}
  //     component={component}
  //   />
  // )
  return null
}
