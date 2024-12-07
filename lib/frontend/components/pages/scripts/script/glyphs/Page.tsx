'use client'

import clsx from 'clsx'
import NextLink from 'next/link'

import T from '@termsurf/leaf/component/Text'

import { H1 } from '@termsurf/leaf/component/Content'
import Grid from '@termsurf/leaf/component/Grid'
import Toast from '@termsurf/leaf/component/Toast'
import { usePageSettings } from '@termsurf/leaf/hook/usePageSettings'
import useScripts from '@termsurf/leaf/hook/useScripts'
import Environment from '~/lib/frontend/components/Environment'

import Layout from '@termsurf/leaf/component/Layout'
import Text from '@termsurf/leaf/component/Text'
import useFonts from '@termsurf/leaf/hook/useFonts'
import { RefObject, useRef } from 'react'
import { useResizeObserver } from 'usehooks-ts'
import { distributeGridLayout } from '~/lib/shared/utilities/grid'
import GlyphsLink from '../../../../GlyphsLink'

export const CACHED = {}

export type Cached = {}

const KEY = '/languages'

export type GridLink = {
  title: string
  description?: string
  path: string
}

export type PageLink = {
  name: string
  slug: string
  symbols: Array<{
    text: string
    hint?: string
    slug?: string
    fontSize?: number
  }>
}

type PageInput = {
  scriptSlug: string
  symbols: Array<{
    text: string
    hint?: string
    slug?: string
    fontSize?: number
  }>
  links?: Array<PageLink>
  fontSize?: number
  glyphType: string
  wide?: boolean
}

export default function GlyphsPage(props: PageInput) {
  return (
    <Environment>
      <Content {...props} />
    </Environment>
  )
}

type ContentInput = PageInput

function Content(props: ContentInput) {
  useScripts([props.scriptSlug, 'latin'])
  useFonts(['Noto Sans Mono'])

  return (
    <Layout>
      <Header {...props} />
      <Body {...props} />
      <Toast />
    </Layout>
  )
}

type HeaderInput = PageInput

function Header({ scriptSlug, glyphType }: HeaderInput) {
  const { cached } = usePageSettings<any, Cached>()

  return (
    <header className="mt-64 !mb-32">
      <H1>
        <NextLink
          href={`/scripts/${scriptSlug}`}
          className="hover:text-violet-600 transition-colors"
        >
          {scriptSlug.replace(/-/g, ' ')}
        </NextLink>
      </H1>
      <Text className="px-16 text-center block lowercase text-sm text-zinc-400">
        {glyphType}
      </Text>
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
  const ref = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>
  const { width = 0 } = useResizeObserver({ ref })
  return (
    <>
      <div
        ref={ref}
        className={clsx(
          'relative w-full pb-64 flex flex-col gap-16 p-16',
          width === 0 && 'opacity-0',
        )}
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
              fontSize={symbol.fontSize ?? fontSize}
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
        {/* <H2 className="!text-2xl !mb-0 !text-zinc-600 !border-0 text-center uppercase scale-y-80 tracking-wide-015">
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
          className="block h-112 font-semibold text-h0 sm:text-h0-large transition-colors"
        >
          {text}
        </T>
        {hint && (
          <T
            script="latin"
            className="block text-2xl font-semibold transition-colors text-zinc-300"
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
        size={fontSize ?? 64}
        className={clsx(
          script === 'cuneiform' ? 'h-128' : 'h-96',
          'block font-semibold transition-colors text-center',
        )}
      >
        {text}
      </T>
      {hint && (
        <T
          script="latin"
          className="block text-2xl font-semibold transition-colors text-zinc-400 dark:text-zinc-500"
        >
          {hint}
        </T>
      )}
    </NextLink>
  )
}
