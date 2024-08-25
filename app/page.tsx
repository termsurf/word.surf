import Page from '~/page/Page'

import { buildMetadata } from '@termsurf/leaf/utility/metadata'

export { viewport } from '@termsurf/leaf/constant/viewport'

export const metadata = buildMetadata('ChatSurf', {
  title: 'ChatSurf',
})

export default async function View() {
  return <Page />
}
