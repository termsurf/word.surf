import { getLanguage } from '~/lib/backend/queries/languages'
import Page from '~/lib/frontend/components/pages/languages/language/create/Page'

export const dynamic = 'force-dynamic'

type Properties = {
  params: Promise<{ language: string }>
}

export default async function View(props: Properties) {
  const params = await props.params
  const response = await getLanguage({ slug: params.language })
  const state = { getLanguage: response }
  return (
    <Page
      state={state}
      slug={params.language}
    />
  )
}
