import React from 'react'
import Page from '~/page/language/type/components/Page'
import { readBase } from '~/utility/base'

type Input = {
  params: { language: string }
}

export default async function View({ params }: Input) {
  const language = await readBase(`/languages/${params.language}`)
  const components = await readBase(
    `/languages/${params.language}/components`,
  )

  return (
    <Page
      language={language}
      components={components}
    />
  )
}
