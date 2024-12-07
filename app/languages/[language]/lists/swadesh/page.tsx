type Input = {
  params: Promise<{ language: string }>
}

export default async function View(props: Input) {
  const params = await props.params
  // const lists = await findLists({
  //   paths: ['/swadesh/207', '/swadesh/100'],
  // })

  return null
}
