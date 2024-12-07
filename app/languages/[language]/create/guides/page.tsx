import Page from '~/lib/frontend/components/pages/languages/language/create/guides/Page'

export const dynamic = 'force-dynamic'

type Properties = {
  params: Promise<{ language: string }>
}

export default async function View(props: Properties) {
  const params = await props.params
  return <Page slug={params.language} />
}
