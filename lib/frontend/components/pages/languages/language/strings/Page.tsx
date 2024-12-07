'use client'

import { H1 } from '@termsurf/leaf/component/Content'
import Field from '@termsurf/leaf/component/Field'
import Grid from '@termsurf/leaf/component/Grid'
import TriangleLeft from '@termsurf/leaf/component/icon/TriangleLeft'
import TriangleRight from '@termsurf/leaf/component/icon/TriangleRight'
import Label from '@termsurf/leaf/component/Label'
import Layout from '@termsurf/leaf/component/Layout'
import NativeSelect from '@termsurf/leaf/component/NativeSelect'
import Text from '@termsurf/leaf/component/Text'
import Toast from '@termsurf/leaf/component/Toast'
import FontsContext from '@termsurf/leaf/context/FontsContext'
import useFittedText from '@termsurf/leaf/hook/useFittedText'
import useFonts from '@termsurf/leaf/hook/useFonts'
import { usePageSettings } from '@termsurf/leaf/hook/usePageSettings'
import useScripts from '@termsurf/leaf/hook/useScripts'
import clsx from 'clsx'
import { default as Link, default as NextLink } from 'next/link'
import { RefObject, useContext, useMemo, useRef } from 'react'
import { useResizeObserver } from 'usehooks-ts'
import Environment from '~/lib/frontend/components/Environment'
import { getMeasuredMaxWidthFromStrings } from '~/lib/frontend/utilities/elements'
import { Language } from '~/lib/shared/constants'

export const CACHED = {
  page: 1,
  size: 200,
}

export type Cached = {
  page: number
  size: number
}

const PATH = '/languagse/language/strings'

const BASE_FONT_SIZE = 18

const FONT_SIZE_MULTIPLIERS: Record<
  string,
  { heading?: number; body?: number; weight: number }
> = {
  arabic: {
    weight: 400,
    heading: 1.5,
    body: 1.25,
  },
  tibetan: {
    weight: 600,
    heading: 1.5,
    body: 1.25,
  },
  hebrew: {
    weight: 600,
    heading: 1.5,
    body: 1.25,
  },
}

type PageInput = {
  language: Language
  strings: Array<string>
}

export default function Page({ language, strings }: PageInput) {
  return (
    <Environment>
      <Content
        language={language}
        strings={strings}
      />
    </Environment>
  )
}

type ContentInput = PageInput

function Content({ language, strings }: ContentInput) {
  useFonts(['Tone Etch'])
  useScripts(['arabic', 'hebrew', 'tibetan', 'code'])

  return (
    <Layout
      bottomCenter={<Pagination />}
      right={
        <div className="w-full p-16">
          <form>
            <Field>
              <Label>role</Label>
              <NativeSelect color="base">
                <option>noun</option>
                <option>verb</option>
              </NativeSelect>
            </Field>
          </form>
        </div>
      }
    >
      <div className="mt-32">
        <Header language={language} />
        <Body
          language={language}
          strings={strings}
        />
        <Toast />
      </div>
    </Layout>
  )
}

type HeaderInput = {
  language: Language
}

function Header({ language }: HeaderInput) {
  const { cached } = usePageSettings<any, Cached>()

  return (
    <header className="mt-64 mb-32">
      <H1 className="flex flex-col">
        <Link href={`/languages/${language.slug}`}>
          {language.name}
        </Link>
      </H1>
      <span className="text-center block lowercase text-sm text-zinc-400">
        Strings
      </span>
    </header>
  )
}

function Body({ language, strings }: ContentInput) {
  const state = useContext(FontsContext)
  const isFontLoaded = state.fonts['MiSansTibetan']
  const ref = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>
  const { width: containerWidth = 0 } = useResizeObserver({ ref })

  const fontWeight = FONT_SIZE_MULTIPLIERS.tibetan.weight!
  const fontSize = Math.round(
    BASE_FONT_SIZE * FONT_SIZE_MULTIPLIERS.tibetan.heading!,
  )
  const maxItemWidth = useMemo(
    () =>
      !isFontLoaded
        ? 320
        : Math.min(
            320,
            getMeasuredMaxWidthFromStrings(strings, {
              fontWeight,
              fontSize: fontSize,
              fontFamily: 'MiSansTibetan',
            }) + 32,
          ),
    [fontSize, isFontLoaded, fontWeight],
  )

  const maxColumns = Math.max(
    1,
    Math.floor(containerWidth / maxItemWidth),
  )

  return (
    <>
      <div
        ref={ref}
        className="relative w-full pb-64 p-16"
      >
        {isFontLoaded && (
          <Grid
            maxColumns={maxColumns}
            minWidth={maxItemWidth}
            gap={16}
          >
            {strings.map(x => (
              <Entry
                key={x}
                text={x}
                fontSize={fontSize}
                fontWeight={fontWeight}
                // direction="rtl"
              />
            ))}
          </Grid>
        )}
      </div>
    </>
  )
}

function Entry({
  text,
  fontSize,
  fontWeight,
  direction = 'ltr',
}: {
  text: string
  fontSize: number
  fontWeight: number
  direction?: 'rtl' | 'ltr'
}) {
  const { fontSize: fittedFontSize, ref } = useFittedText({
    minFontSize: 16,
    maxFontSize: fontSize,
    fontFamily: 'MiSansTibetan',
    fontWeight: 600,
  })

  return (
    <NextLink
      href="/"
      className={clsx(
        'shadow-small1 hover:shadow-small2 flex-1 flex flex-col bg-zinc-50 [&>div]:hover:text-violet-600 [&>div]:transition-colors transition-all duration-200 text-left p-16 h-full leading-content rounded-sm w-full [&_span]:hover:text-violet-600 [&_i]:hover:text-violet-400 min-w-1 justify-center',
      )}
    >
      <div
        ref={ref}
        dir={direction}
      >
        <Text
          script="tibetan"
          size={fittedFontSize}
          style={{ fontWeight }}
          leading="heading"
          className={clsx(
            'block font-semibold lowercase text-h4 transition-colors overflow-hidden text-ellipsis whitespace-nowrap',
            direction === 'rtl' && `text-right`,
          )}
        >
          {text}
        </Text>
      </div>
    </NextLink>
  )
}

function Pagination() {
  const { cached, setCached } = usePageSettings<any, Cached>()
  // const { data } = useGetLanguagesQuery(cached)
  const data = null

  const handleLeft = () => {
    setCached({
      ...cached,
      page: cached.page === 1 ? cached.page : cached.page - 1,
    })
  }

  const handleRight = () => {
    setCached({
      ...cached,
      page:
        // cached.page === data?.languages.size - 1
        //   ? cached.page
        //   :
        cached.page + 1,
    })
  }

  return (
    <div className="flex w-full justify-between items-center">
      <div
        className="w-40 h-40 p-8 cursor-pointer"
        onClick={handleLeft}
      >
        <TriangleLeft hoverable />
      </div>
      <div
        className="w-40 h-40 p-8 cursor-pointer"
        onClick={handleRight}
      >
        <TriangleRight hoverable />
      </div>
    </div>
  )
}
