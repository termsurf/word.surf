'use client'

import { H1 } from '@termsurf/leaf/component/Content'
import Toast from '@termsurf/leaf/component/Toast'
import useFonts from '@termsurf/leaf/hook/useFonts'
import { usePageSettings } from '@termsurf/leaf/hook/usePageSettings'
import NextLink from 'next/link'
import Environment from '~/lib/frontend/components/Environment'

import { Language } from '~/lib/shared/constants'

import Grid from '@termsurf/leaf/component/Grid'
import Text from '@termsurf/leaf/component/Text'
import {
  languageListPath,
  languagePath,
} from '~/lib/shared/utilities/paths'
import SML from '../../../../SML'

export const CACHED = {}

export type Cached = {}

const PATH = '/languages/language/lists'

type PageInput = {
  language: Language
}

export default function Page({ language }: PageInput) {
  return (
    <Environment>
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
    <header className="mt-64">
      <H1 className="flex flex-col">
        <NextLink
          href={languagePath({ language: language.slug })}
          className="block uppercase scale-y-80 tracking-wide-015"
        >
          {language.name}
        </NextLink>
        <span className="block lowercase text-sm text-zinc-400">
          Lists
        </span>
        {/* <span className="block text-base font-normal">
          A language of the Himalayas
        </span> */}
      </H1>
    </header>
  )
}

const TERMS = [{}]

function Body({ language }: ContentInput) {
  return (
    <>
      <div className="relative w-full pb-64">
        <Grid
          maxColumns={3}
          minWidth={128}
          gap={16}
          className="p-16"
          breakpoints={[3, 1]}
        >
          <NextLink
            href={languageListPath({
              language: language.slug,
              path: 'nouns',
            })}
            className="hover:shadow-lg bg-zinc-50 rounded-sm p-16 flex flex-col gap-8 [&>span]:hover:text-violet-600 transition-all"
          >
            <Text className="block text-center text-2xl font-semibold">
              nouns
            </Text>
            <SML
              type="nouns"
              language={language}
            />
          </NextLink>
          <NextLink
            href={languageListPath({
              language: language.slug,
              path: 'verbs',
            })}
            className="hover:shadow-lg bg-zinc-50 rounded-sm p-16 flex flex-col gap-8 [&>span]:hover:text-violet-600 transition-all"
          >
            <Text className="block text-center text-2xl font-semibold">
              verbs
            </Text>
            <SML
              type="verbs"
              language={language}
            />
          </NextLink>
          <NextLink
            href={languageListPath({
              language: language.slug,
              path: 'adjectives',
            })}
            className="hover:shadow-lg bg-zinc-50 rounded-sm p-16 flex flex-col gap-8 [&>span]:hover:text-violet-600 transition-all"
          >
            <Text className="block text-center text-2xl font-semibold">
              adjectives
            </Text>
            <SML
              type="adjectives"
              language={language}
            />
          </NextLink>
        </Grid>
      </div>
    </>
  )
}
