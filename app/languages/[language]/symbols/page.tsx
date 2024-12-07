type Input = {
  params: Promise<{ language: string }>
}

export default async function View(props: Input) {
  const params = await props.params

  // return <Page language={language} />
  return null
}
