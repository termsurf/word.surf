import { notFound } from 'next/navigation'
import { generateMetadata, renderPage } from '~/handlers/scripts/script'

type Input = {
  params: { script: string; path: Array<string> }
}

export { generateMetadata }

export default async function View({ params }: Input) {
  const page = await renderPage(
    `/${params.script}/${params.path.join('/')}`,
  )

  if (!page) {
    notFound()
  }

  return page
}
