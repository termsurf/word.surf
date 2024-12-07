'use client'

import TermsOfServicePage from '@termsurf/leaf/component/page/TermsOfServicePage'
import Environment from '~/lib/frontend/components/Environment'

export default function Page() {
  return (
    <Environment>
      <TermsOfServicePage title="WordSurf" />
    </Environment>
  )
}
