'use client'

import clsx from 'clsx'

import { H1 } from '@termsurf/leaf/component/Content'
import Grid from '@termsurf/leaf/component/Grid'
import { usePageSettings } from '@termsurf/leaf/hook/usePageSettings'
import useScripts from '@termsurf/leaf/hook/useScripts'
import Environment from '~/lib/frontend/components/Environment'

import Text from '@termsurf/leaf/component/Text'
import useFonts from '@termsurf/leaf/hook/useFonts'
import Link from 'next/link'
import { RefObject, useRef } from 'react'
import { useResizeObserver } from 'usehooks-ts'
import { distributeGridLayout } from '~/lib/shared/utilities/grid'
import GlyphsLink from '../../../../../GlyphsLink'

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
  symbols: Array<{ text: string; hint?: string; slug?: string }>
}

type PageInput = {
  scriptSlug: string
  symbols: Array<{ text: string; hint?: string; slug?: string }>
  links?: Array<PageLink>
  fontSize?: number
  glyph: string
}

export default function CombinationsPage(props: PageInput) {
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
    <>
      <Header {...props} />
      <Body {...props} />
      {/* <Toast /> */}
    </>
  )
}

type HeaderInput = PageInput

function Header({ scriptSlug, glyph }: HeaderInput) {
  const { cached } = usePageSettings<any, Cached>()

  return (
    <header className="mt-64">
      <H1 className="flex flex-col !mb-32">
        <Text
          script={scriptSlug}
          leading="base"
          className="block text-super-duper-mega !sm:text-super-duper-mega-large font-bold"
        >
          {glyph}
        </Text>
        <Link
          href={`/scripts/${scriptSlug}`}
          className="block uppercase scale-y-80 tracking-wide-015 text-h4 sm:text-h4-large text-zinc-400 hover:text-violet-400 transition-colors mb-4"
        >
          <Text script="latin">{scriptSlug.replace(/-/g, ' ')}</Text>
        </Link>
        <span className="block lowercase text-sm text-zinc-400">
          <Text script="latin">Combinations</Text>
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

function Body({ symbols, links, fontSize, scriptSlug }: ContentInput) {
  const ref = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>
  const { width = 0 } = useResizeObserver({ ref })
  return (
    <>
      <div
        ref={ref}
        className="relative w-full pb-64 flex flex-col gap-16 p-16"
      >
        <Grid
          maxColumns={6}
          minWidth={width < 500 ? 96 : 120}
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
          'flex flex-col text-center pb-16 h-full leading-content rounded-sm w-full',
        )}
      >
        <Text
          script={script}
          className="block font-semibold text-h0 sm:text-h0-large leading-content transition-colors"
        >
          {text}
        </Text>
        {hint && (
          <Text
            script="latin"
            className="block text-xl leading-content transition-colors text-zinc-400"
          >
            {hint}
          </Text>
        )}
      </div>
    )
  }

  return (
    <Link
      href={slug}
      className={clsx(
        className,
        'flex flex-col [&_span]:hover:text-violet-600 [&_span]:transition-colors transition-all duration-200 text-center pb-16 h-full leading-content rounded-sm w-full [&_i]:hover:text-violet-400',
      )}
    >
      <Text
        script={script}
        className="block font-semibold text-h0 leading-content transition-colors"
      >
        {text}
      </Text>
      {hint && (
        <Text
          script="latin"
          className="block text-xl leading-content transition-colors text-zinc-400"
        >
          {hint}
        </Text>
      )}
    </Link>
  )
}
