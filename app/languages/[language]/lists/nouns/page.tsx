export type Input = {
  params: Promise<{ language: string }>
}

export default async function View(props: Input) {
  const params = await props.params
  // const language = await findLanguage(params)
  // const images = await mapImages(IMAGES.SMALL)
  // const { path, items, languages } = await findLanguageList({
  //   language: params.language,
  //   path: 'noun/small',
  // })

  // return (
  //   <Page
  //     language={language}
  //     languages={languages}
  //     items={items}
  //     images={images}
  //   />
  // )
  return null
}
