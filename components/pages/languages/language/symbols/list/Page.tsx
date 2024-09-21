'use client'

import { H1 } from '@termsurf/leaf/component/Content'
import Environment from '@termsurf/leaf/component/Environment'
import Toast from '@termsurf/leaf/component/Toast'
import { FONT, SCRIPT } from '@termsurf/leaf/constant/settings'
import useFonts from '@termsurf/leaf/hook/useFonts'
import { usePageSettings } from '@termsurf/leaf/hook/usePageSettings'
import talk from '@termsurf/talk'
import NextLink from 'next/link'
import { Language, LanguageListItem } from '~/data/types'

import Grid from '@termsurf/leaf/component/Grid'
import SoundIcon from '@termsurf/leaf/component/icon/Sound'
import Text from '@termsurf/leaf/component/Text'
import { languagePath } from '~/tools/paths'
import { Cached } from './config'

const KEY = '/languages/language'

type PageInput = {
  language: Language
  items: Array<LanguageListItem>
}

export default function Page({ language, items }: PageInput) {
  return (
    <Environment settings={{ fonts: FONT, scripts: SCRIPT }}>
      <Content
        language={language}
        items={items}
      />
    </Environment>
  )
}

type ContentInput = PageInput

function Content({ language, items }: ContentInput) {
  useFonts(['Tone Etch', 'Noto Serif Tibetan'])

  return (
    <>
      <Header
        language={language}
        items={items}
      />
      <Body
        language={language}
        items={items}
      />
      <Toast />
    </>
  )
}

function Header({ language }: ContentInput) {
  const { cached } = usePageSettings<any, Cached>()

  return (
    <header>
      <H1 className="flex flex-col">
        <NextLink
          href={languagePath({ language: language.slug })}
          className="block uppercase scale-y-80 tracking-wide-015"
        >
          {language.name}
        </NextLink>
        <span className="block lowercase text-sm text-gray-400">
          Consonants
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

function calculateColumns({ totalCount, itemWidth, containerWidth }) {
  let max = Math.min(Math.floor(containerWidth / itemWidth), 7)
  while (max > 3) {
    const maxIsEven = isEven(max)
    const remainder = totalCount % max
    const remainderIsEven = isEven(remainder)
    if (maxIsEven && remainderIsEven) {
      const diff = max - remainder
      if (diff <= 2) {
        return max
      }
    } else if (!maxIsEven && (!remainderIsEven || !remainder)) {
      const diff = max - remainder
      if (diff <= 2) {
        return max
      }
    } else {
      // one is even, one is odd
    }
    max--
  }
  return max
}

function isEven(n) {
  return n % 2 === 0
}

function Body({ language, items }: ContentInput) {
  const columns = calculateColumns({
    totalCount: Object.keys(basicConsonants).length,
    itemWidth: 96,
    containerWidth: 700,
  })
  return (
    <>
      <div className="relative w-full pb-64 p-16 flex flex-col gap-16">
        {/* <H2 className="!text-2xl !text-gray-600 !border-0 text-center uppercase scale-y-80 tracking-wide-015">
          Consonants
        </H2> */}
        <Grid
          maxColumns={6}
          minWidth={64}
          gap={8}
          rowGap={0}
          breakpoints={[6, 4, 3]}
          align="center"
          className="mb-64"
        >
          {Object.keys(basicConsonants)
            .concat(Object.keys(basicConsonants))
            .slice(0, 24)
            .map((item, i) => (
              <NextLink
                key={`${item}-${i}`}
                href=""
                className="[&_i]:hover:opacity-100 hover:text-violet-600 transition-colors flex flex-col gap-8 items-center"
              >
                <div className="flex flex-col items-center">
                  <Text
                    script="tibetan"
                    className="block font-semibold text-6xl leading-[1.4]"
                  >
                    {item}
                  </Text>
                  <div className="text-gray-500">
                    {talk(basicConsonants[item])}
                  </div>
                </div>
                <i className="opacity-0 transition-opacity hover:text-violet-600 inline-block w-32 h-32 p-8">
                  <SoundIcon />
                </i>
              </NextLink>
            ))}
        </Grid>
      </div>
    </>
  )
}
