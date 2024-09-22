'use client'

import clsx from 'clsx'
import NextLink from 'next/link'

import T from '@termsurf/leaf/component/Text'

import { H1, HR } from '@termsurf/leaf/component/Content'
import Environment from '@termsurf/leaf/component/Environment'
import Grid from '@termsurf/leaf/component/Grid'
import Toast from '@termsurf/leaf/component/Toast'
import { FONT, SCRIPT } from '@termsurf/leaf/constant/settings'
import useFonts from '@termsurf/leaf/hook/useFonts'
import { usePageSettings } from '@termsurf/leaf/hook/usePageSettings'

import Link from 'next/link'
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
  symbols: Array<string>
}

type PageInput = {
  scriptSlug: string
  symbols: Array<string>
  links?: Array<PageLink>
  fontSize?: number
  glyphType: string
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
  useFonts(['Tone Etch', 'Noto Serif SC', 'Noto Sans SC', 'TW Kai'])

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
    <header>
      <H1 className="flex flex-col !mb-16">
        <Link
          href={`/scripts/${scriptSlug}`}
          className="block uppercase scale-y-80 tracking-wide-015 hover:text-violet-600 transition-colors"
        >
          {scriptSlug.replace(/-/g, ' ')}
        </Link>
        <span className="block lowercase text-sm text-gray-400">
          {glyphType}
        </span>
      </H1>
    </header>
  )
}

function Body({ symbols, links, fontSize, scriptSlug }: ContentInput) {
  return (
    <>
      <div className="relative w-full pb-64 flex flex-col gap-16 p-16">
        <Grid
          maxColumns={8}
          minWidth={96}
          maxWidth={160}
          gap={16}
          align="center"
          breakpoints={[4, 3, 2]}
        >
          {symbols.map(symbol => (
            <GlyphLink
              key={symbol}
              text={symbol}
              slug=""
            />
          ))}
        </Grid>
      </div>
      <HR className="!my-0" />
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
  text,
  disabled = false,
  weight,
  fontSize,
}: {
  className?: string
  slug: string
  font?: string
  disabled?: boolean
  text: string
  weight?: string
  fontSize?: number
}) {
  if (disabled) {
    return (
      <div
        className={clsx(
          className,
          'shadow-small1 flex flex-col gap-16 bg-gray-100 text-left pb-16 h-full leading-content rounded-sm w-full',
        )}
      >
        <T className="block font-semibold text-hlarge leading-content transition-colors">
          {text}
        </T>
      </div>
    )
  }

  return (
    <NextLink
      href={slug}
      className={clsx(
        className,
        'flex flex-col gap-16 [&_span]:hover:text-violet-600 [&_span]:transition-colors transition-all duration-200 text-center pb-16 h-full leading-content rounded-sm w-full [&_i]:hover:text-violet-400',
      )}
    >
      <T className="block font-semibold text-hlarge leading-content transition-colors">
        {text}
      </T>
    </NextLink>
  )
}
