'use client'

// import { Document, Index, Worker } from 'flexsearch'

import { H1 } from '@termsurf/leaf/component/Content'
import Environment from '@termsurf/leaf/component/Environment'
import Toast from '@termsurf/leaf/component/Toast'
import { FONT, SCRIPT } from '@termsurf/leaf/constant/settings'
import useFonts from '@termsurf/leaf/hook/useFonts'
import { usePageSettings } from '@termsurf/leaf/hook/usePageSettings'

import Text from '@termsurf/leaf/component/Text'
import Link from 'next/link'
import React from 'react'
import { Cached } from './config'

const KEY = '/languages'

export type GridLink = {
  title: string
  description?: string
  path: string
}

type PageInput = {}

export default function Page() {
  return (
    <Environment settings={{ fonts: FONT, scripts: SCRIPT }}>
      <Content />
    </Environment>
  )
}

type ContentInput = PageInput

function Content() {
  useFonts(['Tone Etch'])

  return (
    <>
      <Header />
      <Body />
      <Toast />
    </>
  )
}

function Header() {
  const { cached } = usePageSettings<any, Cached>()

  return (
    <header>
      <H1 className="block uppercase scale-y-80 tracking-wide-015">
        <Glyph
          glyph="A"
          slug="/symbols/a"
          status=""
          code=""
        />
        Symbol
      </H1>
    </header>
  )
}

function Body() {
  return (
    <>
      <div className="relative w-full pb-64 flex flex-col gap-16 p-16"></div>
    </>
  )
}

function Glyph({
  glyph,
  slug,
  font,
  code,
  status,
}: {
  glyph?: string | undefined
  slug?: string | undefined
  font?: string
  code: string
  status: string
}) {
  if (!slug) {
    return (
      <div className="mb-2 rounded-sm bg-gray-200 h-94 flex text-xl justify-center items-center p-4">
        {' '}
      </div>
    )
  }

  // if (!glyph) {
  //   return (
  //     <div className="mb-2 rounded-sm bg-gray-50 h-94 flex text-xl justify-center items-center p-4">
  //       {' '}
  //     </div>
  //   )
  // }

  const fontStyle = font ? font.split(/\s*,\s*/) : font

  return (
    <Link
      href={`/symbols/${slug}`}
      className="overflow-hidden mb-2 rounded-sm bg-gray-50 h-94 flex text-h2 justify-center items-center p-4 hover:text-violet-600 transition-colors hover:bg-gray-100"
      title={code}
    >
      <Text
        className={
          status === 'abbreviation'
            ? `border-2 border-dotted text-base px-4`
            : undefined
        }
        font={fontStyle}
      >
        {glyph}
      </Text>
    </Link>
  )
}
