'use client'

import { H1, H2 } from '@termsurf/leaf/component/Content'
import Environment from '@termsurf/leaf/component/Environment'
import Toast from '@termsurf/leaf/component/Toast'
import { FONT, SCRIPT } from '@termsurf/leaf/constant/settings'
import useFonts from '@termsurf/leaf/hook/useFonts'
import { usePageSettings } from '@termsurf/leaf/hook/usePageSettings'
import NextLink from 'next/link'
import { Language } from '~/data/types'

import Grid from '@termsurf/leaf/component/Grid'
import Link from '~/components/Link'
// import { calculateGlyphColumns } from '~/tools/grid'
import { languagePath } from '~/tools/paths'
import { Cached } from './config'

const KEY = '/languages/language'

type PageInput = {
  language: Language
}

export default function Page({ language }: PageInput) {
  return (
    <Environment settings={{ fonts: FONT, scripts: SCRIPT }}>
      <Content language={language} />
    </Environment>
  )
}

type ContentInput = PageInput

function Content({ language }: ContentInput) {
  useFonts(['Tone Etch'])

  return (
    <>
      <Header language={language} />
      <Body language={language} />
      <Toast />
    </>
  )
}

function Header({ language }: ContentInput) {
  const { cached } = usePageSettings<any, Cached>()

  return (
    <header>
      <H1 className="flex flex-col !mb-16">
        <NextLink
          href={languagePath({ language: language.slug })}
          className="block uppercase scale-y-80 tracking-wide-015"
        >
          {language.name}
        </NextLink>
        <span className="block lowercase text-sm text-gray-400">
          Symbols
        </span>
        {/* <span className="block text-base font-normal">
          A language of the Himalayas
        </span> */}
      </H1>
    </header>
  )
}

export const basicConsonants: Record<string, string> = {
  ཀ: 'ka',
  ཁ: 'kh~a',
  ག: 'ga',
  ང: 'qa',
  ཅ: 'txa',
  ཆ: 'txh~a',
  ཇ: 'dja',
  ཉ: 'ny~a',
  ཏ: 'ta',
  ཐ: 'th~a',
  ད: 'da',
  ན: 'na',
  པ: 'pa',
  ཕ: 'ph~a',
  བ: 'ba',
  མ: 'ma',
  ཙ: 'tsa',
  ཚ: 'tsh~a',
  ཛ: 'dza',
  ཝ: 'wa',
  ཞ: 'ja',
  ཟ: 'za',
  འ: 'hh~',
  ཡ: 'ya',
  ར: 'ra',
  ལ: 'la',
  ཤ: 'xa',
  ས: 'sa',
  ཧ: 'ha',
}

function Body({ language }: ContentInput) {
  // const columns = calculateGlyphColumns({
  //   totalCount: Object.keys(basicConsonants).length,
  //   itemWidth: 96,
  //   containerWidth: 700,
  // })
  return (
    <>
      <div className="relative w-full pb-64 p-16 flex flex-col gap-16">
        <Grid
          maxColumns={12}
          minWidth={48}
          gap={8}
          rowGap={32}
          breakpoints={[12, 8, 6, 4, 3]}
          align="center"
          className="mb-32"
        >
          {Object.keys(basicConsonants)
            .concat(Object.keys(basicConsonants))
            .slice(0, 24)
            .map(item => (
              <NextLink
                key={item}
                href=""
                className="hover:text-violet-600 transition-colors flex flex-col gap-16 justify-center items-center"
              >
                <div className="font-semibold text-5xl">{item}</div>
                {/* <div className="text-gray-500">
                {talk(basicConsonants[item])}
              </div> */}
              </NextLink>
            ))}
        </Grid>
        <H2 className="!text-2xl !mb-0 !text-gray-600 !border-0 text-center uppercase scale-y-80 tracking-wide-015">
          Links
        </H2>
        <Grid
          maxColumns={2}
          minWidth={320}
          gap={16}
          breakpoints={[2, 1]}
        >
          <Link
            path=""
            title="Consonants"
          />
          <Link
            path=""
            title="Vowels"
          />
          <Link
            path=""
            title="Combining Vowels"
          />
          <Link
            path=""
            title="Marks"
          />
          <Link
            path=""
            title="Numerals"
          />
        </Grid>
      </div>
    </>
  )
}
