import { notFound } from 'next/navigation'
import render from './pages'

type Input = {
  params: { script: string; path: Array<string> }
}

export default async function View({ params }: Input) {
  const page = await render(
    `/${params.script}/${params.path.join('/')}`,
  )

  if (!page) {
    notFound()
  }

  return page
}
