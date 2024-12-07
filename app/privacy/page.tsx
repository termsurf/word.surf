'use client'

import PrivacyPolicyPage from '@termsurf/leaf/component/page/PrivacyPolicyPage'
import Environment from '~/lib/frontend/components/Environment'

export default function Page() {
  return (
    <Environment>
      <PrivacyPolicyPage title="WordSurf" />
    </Environment>
  )
}
