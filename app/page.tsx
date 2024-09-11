import { buildMetadata } from '@termsurf/leaf/utility/metadata'

import Page from '~/components/pages/Page'

export { viewport } from '@termsurf/leaf/constant/viewport'

export const metadata = buildMetadata('ChatSurf', {
  title: 'ChatSurf',
})

export default async function View() {
  return <Page />
}
