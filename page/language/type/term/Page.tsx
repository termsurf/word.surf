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
import { CACHED, Cached } from './config'
import { usePageSettings } from '~/site/shared/tool/hook/usePageSettings'

const KEY = '/language/type/term'
const NEEDS: Array<Setting> = ['tools']

enum Text {
  title = 'site.chat.page.language.type.term.title',
  description = 'site.chat.page.language.type.term.description',
}

type PageInput = {
  language: string
}

export default function Page({
  locale,
  messages,
  language,
}: PageInput) {
  return (
    <ContentProvider
      path={KEY}
      cached={{ ...CACHED, language }}
    >
      <Content
        locale={locale}
        messages={messages}
      />
    </ContentProvider>
  )
}

type ContentInput = {
  locale: LocaleName
  messages: Locale
}

function Content({ locale, messages }: ContentInput) {
  const toast = useToast()

  return (
    <CenterLayout
      needs={NEEDS}
      locale={locale}
      messages={messages}
    >
      <Header />
      <Body />
      <Toast />
    </CenterLayout>
  )
}

function Header() {
  const { cached } = usePageSettings<any, Cached>()

  return (
    <header>
      <H1>
        <I
          id={Text.title}
          values={cached}
        />
      </H1>
      <P
        align="center"
        type="secondary"
      >
        <I
          id={Text.description}
          values={cached}
        />
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

const TERMS = [{}]

function Body() {
  return (
    <>
      <HR className="mb-0" />
      <div className="relative w-full"></div>
      <HR className="mt-0" />
    </>
  )
}
