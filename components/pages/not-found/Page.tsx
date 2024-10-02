'use client'

import Environment from '@termsurf/leaf/component/Environment'
import BaseNotFoundPage from '@termsurf/leaf/component/page/NotFoundPage'
import { FONT, SCRIPT } from '~/data/fonts'

export default function NotFoundPage() {
  return (
    <Environment
      settings={{ fonts: FONT, scripts: SCRIPT }}
      left={<div className="h-full w-full bg-rose-400" />}
      right={<div className="h-full w-full bg-rose-400" />}
    >
      <BaseNotFoundPage />
    </Environment>
  )
}
