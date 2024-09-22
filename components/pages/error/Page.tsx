import Environment from '@termsurf/leaf/component/Environment'
import BaseErrorPage, {
  ErrorPageInput,
} from '@termsurf/leaf/component/page/ErrorPage'
import { FONT, SCRIPT } from '@termsurf/leaf/constant/settings'

export default function ErrorPage({ error, reset }: ErrorPageInput) {
  return (
    <Environment
      settings={{ fonts: FONT, scripts: SCRIPT }}
      left={<div className="h-full w-full bg-rose-400" />}
      right={<div className="h-full w-full bg-rose-400" />}
    >
      <BaseErrorPage
        error={error}
        reset={reset}
      />
    </Environment>
  )
}
