export type Input = {
  params: Promise<{ language: string }>
}

export default async function View(props: Input) {
  const params = await props.params
  // const language = await findLanguage(params)
  // const { path, items, languages } = await findLanguageList({
  //   language: params.language,
  //   path: 'noun/large',
  // })

  // return (
  //   <Page
  //     language={language}
  //     items={items}
  //     languages={languages}
  //     // translations={translations}
  //   />
  // )
  return null
}
