import render from './[...path]/routes'

type Input = {
  params: { script: string; path: Array<string> }
}

export default async function View({ params }: Input) {
  const page = await render(`/${params.script}`)
  return page
}
