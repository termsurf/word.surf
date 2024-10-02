'use client'

import Environment from '@termsurf/leaf/component/Environment'
import type { ErrorPageInput } from '@termsurf/leaf/component/page/ErrorPage'
import BaseGlobalErrorPage from '@termsurf/leaf/component/page/GlobalErrorPage'
import { FONT, SCRIPT } from '~/data/fonts'

export default function GlobalErrorPage({
  error,
  reset,
}: ErrorPageInput) {
  return (
    <Environment
      settings={{ fonts: FONT, scripts: SCRIPT }}
      left={<div className="h-full w-full bg-rose-400" />}
      right={<div className="h-full w-full bg-rose-400" />}
    >
      <BaseGlobalErrorPage
        error={error}
        reset={reset}
      />
    </Environment>
  )
}
