import React from 'react'
import Page from '~/page/language/Page'

type Input = {
  params: { language: string }
}

export default async function View({ params }: Input) {
  const languagesRes = await fetch(
    `https://base.chat.surf/languages?size=1000`,
  )
  const languages = await languagesRes.json()

  return <Page languages={languages} />
}
