import { buildMetadata } from '@termsurf/leaf/utility/metadata'

import Page from '~/lib/frontend/components/pages/Page'

export { viewport } from '@termsurf/leaf/constant/viewport'

export const metadata = buildMetadata('WordSurf', {
  title: 'WordSurf',
})

export default async function View() {
  return <Page />
}
