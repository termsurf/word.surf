'use client'

import React from 'react'
import BasePrivacyPolicyPage from '@termsurf/leaf/component/page/PrivacyPolicyPage'
import CenterLayout from '@termsurf/leaf/component/Environment'
import { SITE_NAME } from '~/site/shared/base/value/site'

export default function PrivacyPolicyPage() {
  return (
    <CenterLayout needs={['tools']}>
      <BasePrivacyPolicyPage title={SITE_NAME} />
    </CenterLayout>
  )
}
