import React from 'react'
import Page from '~/page/language/Page'
import { readBase } from '~/utility/base'

export default async function View() {
  const languages = await readBase(`/languages?size=1000`)

  return <Page languages={languages} />
}
