'use client'

import clsx from 'clsx'
import NextLink from 'next/link'

import T from '@termsurf/leaf/component/Text'

import { H1 } from '@termsurf/leaf/component/Content'
import Environment from '@termsurf/leaf/component/Environment'
import Grid from '@termsurf/leaf/component/Grid'
import Toast from '@termsurf/leaf/component/Toast'
import { FONT, SCRIPT } from '@termsurf/leaf/constant/settings'
import { usePageSettings } from '@termsurf/leaf/hook/usePageSettings'
import useScripts from '@termsurf/leaf/hook/useScripts'

import useFonts from '@termsurf/leaf/hook/useFonts'
import { useRef } from 'react'
import { useResizeObserver } from 'usehooks-ts'
import { distributeGridLayout } from '~/tools/grid'
import GlyphsLink from '../GlyphsLink'
import { Cached } from './config'

const KEY = '/languages'

export type GridLink = {
  title: string
  description?: string
  path: string
}

export type PageLink = {
  name: string
  slug: string
  symbols: Array<{ text: string; hint?: string; slug?: string }>
}

type PageInput = {
  scriptSlug: string
  symbols: Array<{ text: string; hint?: string; slug?: string }>
  links?: Array<PageLink>
  fontSize?: number
  glyphType: string
  wide?: boolean
}

export default function GlyphsPage(props: PageInput) {
  return (
    <Environment settings={{ fonts: FONT, scripts: SCRIPT }}>
      <Content {...props} />
    </Environment>
  )
}

type ContentInput = PageInput

function Content(props: ContentInput) {
  useScripts([props.scriptSlug, 'latin'])
  useFonts(['Noto Sans Mono'])

  return (
    <>
      <Header {...props} />
      <Body {...props} />
      <Toast />
    </>
  )
}

type HeaderInput = PageInput

function Header({ scriptSlug, glyphType }: HeaderInput) {
  const { cached } = usePageSettings<any, Cached>()

  return (
    <header className="mt-64">
      <H1 className="flex flex-col !mb-32">
        <NextLink
          href={`/scripts/${scriptSlug}`}
          className="block uppercase scale-y-80 tracking-wide-015 hover:text-violet-600 transition-colors"
        >
          {scriptSlug.replace(/-/g, ' ')}
        </NextLink>
        <span className="block lowercase text-sm text-gray-400">
          {glyphType}
        </span>
      </H1>
    </header>
  )
}

// function layout(length: number, maxColumns: number) {
//   if (maxColumns >= 4) {
//     if (length % maxColumns === 0) {
//       return bundleSquareLayout(length, maxColumns)
//     } else if (length % (maxColumns - 1) === 0) {
//       return bundleSquareLayout(length, maxColumns - 1)
//     }
//   }
// }

// function bundleSquareLayout(length: number, maxColumns: number) {
//   const result: Array<number> = []
//   while (length) {
//     result.push(maxColumns)
//     length -= maxColumns
//   }
//   return result
// }

function Body({
  symbols,
  links,
  fontSize,
  scriptSlug,
  wide,
}: ContentInput) {
  const ref = useRef(null)
  const { width = 0 } = useResizeObserver({ ref })
  return (
    <>
      <div
        ref={ref}
        className="relative w-full pb-64 flex flex-col gap-16 p-16"
      >
        <Grid
          maxColumns={6}
          minWidth={width < 500 ? (wide ? 128 : 96) : wide ? 160 : 120}
          maxWidth={168}
          gap={width < 500 ? 8 : 16}
          rowGap={width < 500 ? 24 : 32}
          align="center"
          layout={(length, max) => distributeGridLayout(length, max, 3)}
        >
          {symbols.map(symbol => (
            <GlyphLink
              key={symbol.text}
              text={symbol.text}
              hint={symbol.hint}
              script={scriptSlug}
              slug={
                symbol.slug
                  ? `/scripts/${scriptSlug}/${symbol.slug}`
                  : undefined
              }
            />
          ))}
        </Grid>
      </div>
      <div className="relative w-full pb-64 flex flex-col gap-16 p-16">
        {/* <H2 className="!text-2xl !mb-0 !text-gray-600 !border-0 text-center uppercase scale-y-80 tracking-wide-015">
          Breakdowns
        </H2> */}
        {links?.map(link => (
          <GlyphsLink
            key={link.slug}
            name={link.name}
            symbols={link.symbols}
            slug={`${scriptSlug}/${link.slug}`}
            script={scriptSlug}
          />
        ))}
      </div>
    </>
  )
}

function GlyphLink({
  className,
  slug,
  font,
  hint,
  text,
  weight,
  script,
  fontSize,
}: {
  className?: string
  slug?: string | undefined
  font?: string
  text: string
  hint?: string
  weight?: string
  fontSize?: number
  script?: string
}) {
  if (!slug) {
    return (
      <div
        className={clsx(
          className,
          'flex flex-col overflow-hidden text-center pb-16 h-full rounded-sm w-full',
        )}
      >
        <T
          script={script}
          className="block h-96 font-semibold text-h0 sm:text-h0-large transition-colors"
        >
          {text}
        </T>
        {hint && (
          <T
            script="latin"
            className="block text-xl transition-colors text-gray-400"
          >
            {hint}
          </T>
        )}
      </div>
    )
  }

  return (
    <NextLink
      href={slug}
      className={clsx(
        className,
        'flex flex-col overflow-hidden [&_span]:hover:text-violet-600 [&_span]:transition-colors transition-all duration-200 text-center pb-16 h-full rounded-sm w-full [&_i]:hover:text-violet-400',
      )}
    >
      <T
        script={script}
        leading={
          script === 'arabic' || script === 'hebrew' ? 'body' : 'body'
        }
        className="block h-96 font-semibold text-h0 transition-colors"
      >
        {text}
      </T>
      {hint && (
        <T
          script="latin"
          className="block text-xl transition-colors text-gray-400"
        >
          {hint}
        </T>
      )}
    </NextLink>
  )
}
