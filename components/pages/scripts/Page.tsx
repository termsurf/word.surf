'use client'

import clsx from 'clsx'
import NextLink from 'next/link'

import T from '@termsurf/leaf/component/Text'

import { H1 } from '@termsurf/leaf/component/Content'
import Environment from '@termsurf/leaf/component/Environment'
import Grid from '@termsurf/leaf/component/Grid'
import TextInput from '@termsurf/leaf/component/TextInput'
import Toast from '@termsurf/leaf/component/Toast'
import { FONT, SCRIPT } from '@termsurf/leaf/constant/settings'
import useFonts from '@termsurf/leaf/hook/useFonts'
import { usePageSettings } from '@termsurf/leaf/hook/usePageSettings'

import { LinkButton } from '@termsurf/leaf/component/Button'
import { languagePath } from '~/tools/paths'
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
        Scripts
      </H1>
    </header>
  )
}

const TERMS = [{}]

function Body() {
  return (
    <>
      <div className="relative w-full pb-64 flex flex-col gap-16 p-16">
        <TextInput size="large" />

        {/* <H2 className="!text-2xl !mb-0 !text-gray-600 !border-0 text-center uppercase scale-y-80 tracking-wide-015">
          Ancient
        </H2> */}
        <Grid
          minWidth={192}
          gap={16}
          maxColumns={4}
        >
          <ScriptLink
            disabled
            slug="chinese"
            name="Chinese"
          />
          <ScriptLink
            disabled
            slug="arabic"
            name="Arabic"
          />
          <ScriptLink
            disabled
            slug="devanagari"
            name="Devanagari"
          />
          <ScriptLink
            disabled
            slug="hebrew"
            name="Hebrew"
          />
          <ScriptLink
            disabled
            slug="tibetan"
            name="Tibetan"
          />
          <ScriptLink
            disabled
            slug="tamil"
            name="Tamil"
          />
          <ScriptLink
            disabled
            slug="greek"
            name="Greek"
          />
          <ScriptLink
            disabled
            slug="latin"
            name="Latin"
          />
          <ScriptLink
            disabled
            slug="gurmukhi"
            name="Gurmukhi"
          />
          <ScriptLink
            disabled
            slug="thai"
            name="Thai"
          />
          <ScriptLink
            disabled
            slug="telugu"
            name="Telugu"
          />
          <ScriptLink
            disabled
            slug="burmese"
            name="Burmese"
          />
        </Grid>

        <div className="flex justify-center p-16 pt-32 pb-64">
          <LinkButton
            href="/scripts/ancient"
            size="large"
            className="lowercase"
          >
            More Ancient Scripts
          </LinkButton>
        </div>
      </div>
    </>
  )
}

function ScriptLink({
  className,
  slug,
  name,
  native,
  script,
  disabled = false,
}: {
  className?: string
  slug: string
  name: string
  native?: string
  script?: string
  disabled?: boolean
}) {
  if (disabled) {
    return (
      <div
        className={clsx(
          className,
          'shadow-small1 flex flex-col gap-8 bg-gray-100 text-left p-16 h-full leading-content rounded-sm w-full',
        )}
      >
        <T className="block font-semibold lowercase text-h4 leading-content text-gray-300">
          {name}
        </T>
        {native && (
          <T
            // script={script}
            tag="i"
            className="block lowercase text-h4 leading-content text-gray-300"
          >
            {native}
          </T>
        )}
      </div>
    )
  }

  return (
    <NextLink
      href={languagePath({ language: slug })}
      className={clsx(
        className,
        'shadow-small1 hover:shadow-small2 flex flex-col gap-8 bg-gray-50 [&>div]:hover:text-violet-600 [&>div]:transition-colors transition-all duration-200 text-left p-16 h-full leading-content rounded-sm w-full [&_span]:hover:text-violet-600 [&_i]:hover:text-violet-400',
      )}
    >
      <T className="block font-semibold lowercase text-h4 leading-content transition-colors">
        {name}
      </T>
      {native && (
        <T
          // script={script}
          tag="i"
          className="block lowercase text-h4 leading-content text-gray-400 transition-colors"
        >
          {native}
        </T>
      )}
    </NextLink>
  )
}
