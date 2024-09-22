import render from './routes'

type Input = {
  params: { script: string; path: Array<string> }
}

export default async function View({ params }: Input) {
  const page = render(`/${params.script}/${params.path.join('/')}`)
  return page
}
