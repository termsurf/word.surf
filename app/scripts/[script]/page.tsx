import { notFound } from 'next/navigation'
import {
  generateMetadata,
  renderPage,
} from '~/lib/backend/handlers/scripts/script'

type Input = {
  params: Promise<{ script: string; path: Array<string> }>
}

export { generateMetadata }

export default async function View(props: Input) {
  const params = await props.params
  const page = await renderPage(`/${params.script}`)

  if (!page) {
    notFound()
  }

  return page
}
