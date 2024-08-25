import BaseErrorPage, {
  ErrorPageInput,
} from '@termsurf/leaf/component/page/ErrorPage'
import Environment from '@termsurf/leaf/component/Environment'

export default function ErrorPage({ error, reset }: ErrorPageInput) {
  return (
    <Environment
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
