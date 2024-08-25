'use client'

import React from 'react'
import CenterLayout from '@termsurf/leaf/component/Environment'
import Tag from '~/site/shared/tool/component/Tag'
import { H1, P, HR } from '~/site/shared/tool/component/Content'
import I from '~/site/shared/tool/component/Translation'
import { Setting } from '~/site/shared/base/hook/useSettings'
import {
  Locale,
  LocaleName,
} from '~/site/shared/base/value/translation'
import { ContentProvider } from '~/site/shared/base/component/Content'
import Toast, { useToast } from '~/site/shared/tool/component/Toast'
import { getBase } from '~/site/shared/base/utility/base'
import { ListLanguageResponse } from '~/site/shared/base/type'
import Grid from '~/site/shared/tool/component/Grid'
import BoxLink from '~/site/shared/tool/component/BoxLink'

const KEY = '/language'
const NEEDS: Array<Setting> = ['tools']

enum Text {
  title = 'site.chat.page.language.title',
  description = 'site.chat.page.language.description',
}

type PageInput = {
  locale: LocaleName
  messages: Locale
  languages: ListLanguageResponse
}

export default function Page({
  locale,
  messages,
  languages,
}: PageInput) {
  return (
    <ContentProvider path={KEY}>
      <Content
        locale={locale}
        messages={messages}
        languages={languages}
      />
    </ContentProvider>
  )
}

type ContentInput = {
  locale: LocaleName
  messages: Locale
  languages: ListLanguageResponse
}

function Content({ locale, messages, languages }: ContentInput) {
  const toast = useToast()

  return (
    <CenterLayout
      needs={NEEDS}
      locale={locale}
      messages={messages}
    >
      <Header />
      <Body languages={languages} />
      <Toast />
    </CenterLayout>
  )
}

function Header() {
  return (
    <header>
      <H1>
        <I id={Text.title} />
      </H1>
      <P
        align="center"
        type="secondary"
      >
        <I id={Text.description} />
        <span className="text-center block">
          <Tag
            color="blue"
            className="text-white"
          >
            <I id="status.pre-alpha" />
          </Tag>
        </span>
      </P>
    </header>
  )
}

type BodyInput = {
  languages: ListLanguageResponse
}

function Body({ languages }: BodyInput) {
  return (
    <>
      <HR />
      <div className="relative w-full px-16">
        {/* <Grid
          maxColumns={3}
          minWidth={222}
          gap={16}
          align="left"
        >
          {languages.list.map(language => (
            <BoxLink
              key={language.slug}
              link={`/language/${language.slug}`}
              call={language.title}
            />
          ))}
        </Grid> */}
      </div>
      <HR />
    </>
  )
}
