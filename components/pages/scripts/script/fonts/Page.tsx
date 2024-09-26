'use client'

import clsx from 'clsx'
import NextLink from 'next/link'

import T from '@termsurf/leaf/component/Text'

import { H1 } from '@termsurf/leaf/component/Content'
import Environment from '@termsurf/leaf/component/Environment'
import Grid from '@termsurf/leaf/component/Grid'
import Toast from '@termsurf/leaf/component/Toast'
import { FONT, SCRIPT } from '@termsurf/leaf/constant/settings'
import useFonts from '@termsurf/leaf/hook/useFonts'
import { usePageSettings } from '@termsurf/leaf/hook/usePageSettings'

import TextInput from '@termsurf/leaf/component/TextInput'
import { BREAKPOINTS_3_1 } from '~/data/breakpoints'
import { Cached } from './config'

const KEY = '/languages'

export type GridLink = {
  title: string
  description?: string
  path: string
}

type PageInput = {
  scriptSlug: string
  symbols: Array<string>
  fontSize?: number
}

export default function Page(props: PageInput) {
  return (
    <Environment settings={{ fonts: FONT, scripts: SCRIPT }}>
      <Content {...props} />
    </Environment>
  )
}

type ContentInput = PageInput

function Content(props: ContentInput) {
  useFonts([
    'Tone Etch' /*, 'Noto Serif SC', 'Noto Sans SC', 'TW Kai'*/,
  ])

  return (
    <>
      <Header {...props} />
      <Body {...props} />
      <Toast />
    </>
  )
}

type HeaderInput = PageInput

function Header({ scriptSlug }: HeaderInput) {
  const { cached } = usePageSettings<any, Cached>()

  return (
    <header className="mt-64">
      <H1 className="flex flex-col !mb-16">
        <span className="block uppercase scale-y-[0.8] tracking-wide-015">
          {scriptSlug.replace(/-/g, ' ')}
        </span>
        <NextLink
          href="/fonts"
          className="block lowercase text-sm text-gray-400 hover:text-violet-400 transition-colors"
        >
          Fonts
        </NextLink>
      </H1>
    </header>
  )
}

const TERMS = [{}]

function Body({ symbols, fontSize }: ContentInput) {
  return (
    <>
      <div className="relative w-full pb-64 flex flex-col gap-16 p-16">
        <TextInput size="large" />

        <Grid
          minWidth={256}
          gap={16}
          maxColumns={3}
          breakpoints={BREAKPOINTS_3_1}
        >
          <FontLink
            className="text-center"
            slug="chinese/fonts/handwritten"
            name="Handwritten"
            // font="TW Kai"
            sample={symbols}
            fontSize={fontSize}
          />
          <FontLink
            className="text-center"
            slug="chinese/fonts/traditional"
            name="Traditional"
            // font="Noto Serif SC"
            sample={symbols}
            fontSize={fontSize}
          />
          <FontLink
            className="text-center"
            slug="chinese/fonts/modern"
            name="Modern"
            // font="Noto Sans SC"
            sample={symbols}
            fontSize={fontSize}
          />
        </Grid>
      </div>
    </>
  )
}

function FontLink({
  className,
  slug,
  name,
  font,
  sample,
  disabled = false,
  weight,
  fontSize,
}: {
  className?: string
  slug: string
  name: string
  font?: string
  disabled?: boolean
  sample?: Array<string>
  weight?: string
  fontSize?: number
}) {
  if (disabled) {
    return (
      <div
        className={clsx(
          className,
          'shadow-small1 flex flex-col gap-16 bg-gray-100 text-left p-16 pb-32 h-full leading-content rounded-sm w-full',
        )}
      >
        <T className="lowercase block font-semibold text-h4 leading-content text-gray-300">
          {name}
        </T>
        {sample && (
          <Grid
            // script={script}
            className="text-h1 text-gray-800 transition-colors"
            minWidth={48}
            gap={8}
            rowGap={24}
            maxColumns={6}
            breakpoints={[6, 4]}
            align="center"
          >
            {sample.slice(0, 24).map((glyph, i) => (
              <T
                key={`${glyph}-${i}`}
                font={font}
                size={fontSize}
                className={clsx(
                  'block !leading-1-2',
                  weight && `font-${weight}`,
                )}
              >
                {glyph}
              </T>
            ))}
          </Grid>
        )}
      </div>
    )
  }

  return (
    <NextLink
      href={`/fonts/${slug}`}
      className={clsx(
        className,
        'shadow-small1 hover:shadow-small2 flex flex-col gap-16 bg-gray-50 [&_span]:hover:text-violet-600 [&_span]:transition-colors transition-all duration-200 text-left p-16 pb-32 h-full leading-content rounded-sm w-full [&_i]:hover:text-violet-400',
      )}
    >
      <T className="lowercase block font-semibold text-h4 leading-content transition-colors">
        {name}
      </T>
      {sample && (
        <Grid
          // script={script}
          className="text-h1 text-gray-800"
          minWidth={48}
          gap={8}
          rowGap={24}
          maxColumns={6}
          // breakpoints={[6, 4]}
          align="center"
        >
          {sample.slice(0, 24).map((glyph, i) => (
            <T
              key={`${glyph}-${i}`}
              font={font}
              tag="i"
              size={fontSize}
              className={clsx(
                'transition-colors block !leading-1-2',
                weight && `font-${weight}`,
              )}
            >
              {glyph}
            </T>
          ))}
        </Grid>
      )}
    </NextLink>
  )
}
