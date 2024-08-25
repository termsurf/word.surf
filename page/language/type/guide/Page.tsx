'use client'

import { type MDXRemoteSerializeResult } from 'next-mdx-remote'
import React from 'react'
import Environment from '@termsurf/leaf/component/Environment'
import { H1, P } from '@termsurf/leaf/component/Content'
// import { ContentProvider } from '~/site/shared/base/component/Content'
import Toast, { useToast } from '@termsurf/leaf/component/Toast'
import { CACHED, Cached } from './config'
import { usePageSettings } from '@termsurf/leaf/hook/usePageSettings'
import Guide from '~/component/mdx/Guide'
import { FONT, SCRIPT } from '@termsurf/leaf/constant/settings'
import useFonts from '@termsurf/leaf/hook/useFonts'

const KEY = '/language/type/guide'

type PageInput = {
  language: string
  source: MDXRemoteSerializeResult
  title: string
  description?: string
}

export default function Page({
  language,
  source,
  title,
  description,
}: PageInput) {
  return (
    <Environment settings={{ fonts: FONT, scripts: SCRIPT }}>
      {/* // <ContentProvider
    //   path={KEY}
    //   cached={{ ...CACHED, language }}
    // > */}
      <Content
        source={source}
        title={title}
        description={description}
      />
    </Environment>
  )
}

type ContentInput = {
  source: MDXRemoteSerializeResult
  title: string
  description?: string
}

function Content({ source, title, description }: ContentInput) {
  const toast = useToast()
  useFonts(['Tone Etch'])

  return (
    <>
      <Header
        title={title}
        description={description}
      />
      <Body source={source} />
      <Toast />
    </>
  )
}

type HeaderInput = {
  title: string
  description?: string
}

function Header({ title, description }: HeaderInput) {
  const { cached } = usePageSettings<any, Cached>()

  return (
    <header>
      <H1>{title}</H1>
      {description && (
        <P
          align="center"
          type="secondary"
        >
          {description}
        </P>
      )}
    </header>
  )
}

const TERMS = [{}]

function Body({ source }: { source: MDXRemoteSerializeResult }) {
  return (
    <>
      <div className="relative w-full">
        <Guide source={source} />
      </div>
    </>
  )
}
