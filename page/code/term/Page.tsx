'use client'

import React from 'react'
import BaseTermsOfServicePage from '@termsurf/leaf/component/page/TermsOfServicePage'
import CenterLayout from '@termsurf/leaf/component/Environment'
import { SITE_NAME } from '~/site/shared/base/value/site'

export default function TermsOfServicePage() {
  return (
    <CenterLayout needs={['tools']}>
      <BaseTermsOfServicePage title={SITE_NAME} />
    </CenterLayout>
  )
}
