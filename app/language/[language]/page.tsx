import React from 'react'
import Page from '~/page/language/type/Page'

type Input = {
  params: { language: string }
}

export default async function View({ params }: Input) {
  const languageRes = await fetch(
    `https://base.chat.surf/languages/${params.language}`,
  )
  const language = await languageRes.json()

  return <Page language={language} />
}
