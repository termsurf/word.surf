'use client'

import clsx from 'clsx'
import NextLink from 'next/link'

import T from '@termsurf/leaf/component/Text'

import { H1, P } from '@termsurf/leaf/component/Content'
import Environment from '@termsurf/leaf/component/Environment'
import Grid from '@termsurf/leaf/component/Grid'
import TextInput from '@termsurf/leaf/component/TextInput'
import Toast from '@termsurf/leaf/component/Toast'
import { FONT, SCRIPT } from '@termsurf/leaf/constant/settings'
import useFonts from '@termsurf/leaf/hook/useFonts'
import { usePageSettings } from '@termsurf/leaf/hook/usePageSettings'

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
      <H1 className="block uppercase scale-y-80 tracking-wide-015 !mb-0">
        Scripts
      </H1>
      <P
        align="center"
        type="secondary"
      >
        Examine the world&apos;s writing systems
      </P>
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
            slug="latin"
            name="Latin"
            symbol="A"
          />
          <ScriptLink
            slug="chinese"
            name="Chinese"
            symbol="大"
          />
          <ScriptLink
            slug="arabic"
            name="Arabic"
            symbol="ج"
          />
          <ScriptLink
            slug="devanagari"
            name="Devanagari"
            symbol="ॐ"
          />
          <ScriptLink
            slug="hebrew"
            name="Hebrew"
            symbol="א"
          />
          <ScriptLink
            slug="tibetan"
            name="Tibetan"
            symbol="ཀ"
          />
          <ScriptLink
            slug="tamil"
            name="Tamil"
            symbol="க"
          />
          <ScriptLink
            slug="greek"
            name="Greek"
            symbol="Π"
          />
          <ScriptLink
            slug="cyrillic"
            name="Cyrillic"
            symbol="Б"
          />
          <ScriptLink
            slug="geez"
            name="Geez"
            symbol="ሀ"
          />
          <ScriptLink
            slug="gurmukhi"
            name="Gurmukhi"
            symbol="ੴ"
          />
          <ScriptLink
            slug="thai"
            name="Thai"
            symbol="ก"
          />
          <ScriptLink
            slug="telugu"
            name="Telugu"
            symbol="జ"
          />
          <ScriptLink
            slug="burmese"
            name="Burmese"
            symbol="က"
          />
          <ScriptLink
            slug="hangul"
            name="Hangul"
            symbol="라"
          />
          <ScriptLink
            slug="kana"
            name="Kana"
            symbol="カ"
          />
          <ScriptLink
            slug="cherokee"
            name="Cherokee"
            symbol="Ꭿ"
          />
          <ScriptLink
            slug="inuktitut"
            name="Inuktitut"
            symbol="ᐃ"
          />
          <ScriptLink
            slug="tifinagh"
            name="Tifinagh"
            symbol="ⵀ"
          />
          <ScriptLink
            slug="syriac"
            name="Syriac"
            symbol="ܐ"
          />
          <ScriptLink
            slug="georgian"
            name="Georgian"
            symbol="გ"
          />
          <ScriptLink
            slug="bengali"
            name="Bengali"
            symbol="ক"
          />
          <ScriptLink
            slug="kannada"
            name="Kannada"
            symbol="ಕ"
          />
          <ScriptLink
            slug="malayalam"
            name="Malayalam"
            symbol="ക"
          />
          <ScriptLink
            slug="odia"
            name="Odia"
            symbol="କ"
          />
          <ScriptLink
            slug="sinhala"
            name="Sinhala"
            symbol="ක"
          />
          <ScriptLink
            slug="khmer"
            name="Khmer"
            symbol="ក"
          />
          <ScriptLink
            slug="armenian"
            name="Armenian"
            symbol="Ա"
          />
          <ScriptLink
            slug="mongolian"
            name="Mongolian"
            symbol="ᠠ"
          />
          <ScriptLink
            slug="lao"
            name="Lao"
            symbol="ກ"
          />
          <ScriptLink
            slug="vai"
            name="Vai"
            symbol="ꔀ"
          />
          <ScriptLink
            slug="thaana"
            name="Thaana"
            symbol="ޓ"
          />
          <ScriptLink
            slug="mandaic"
            name="Mandaic"
            symbol="ࡗ"
          />
          <ScriptLink
            slug="batak"
            name="Batak"
            symbol="ᯀ"
          />
          <ScriptLink
            slug="lontara"
            name="Lontara"
            symbol="ᨏ"
          />
          <ScriptLink
            slug="balinese"
            name="Balinese"
            symbol="ᬓ"
          />
          <ScriptLink
            slug="cuneiform"
            name="Cuneiform"
            symbol="𒀭"
          />
          <ScriptLink
            slug="phoenician"
            name="Phoenician"
            symbol="𐤀"
          />
          <ScriptLink
            slug="runic"
            name="Runic"
            symbol="ᚠ"
          />
          <ScriptLink
            slug="gothic"
            name="Gothic"
            symbol="𐌸"
          />
          <ScriptLink
            slug="avestan"
            name="Avestan"
            symbol="𐬂"
          />
          <ScriptLink
            slug="ogham"
            name="Ogham"
            symbol="ᚎ"
          />
          <ScriptLink
            slug="coptic"
            name="Coptic"
            symbol="Ⲁ"
          />
          <ScriptLink
            slug="brahmi"
            name="Brahmi"
            symbol="𑀠"
          />
          <ScriptLink
            slug="javanese"
            name="Javanese"
            symbol="ꦏ"
          />
          <ScriptLink
            slug="pahlavi"
            name="Pahlavi"
            symbol="𐭮"
          />
          <ScriptLink
            slug="hieroglyphs"
            name="Hieroglyphs"
            symbol="𓂀"
            weight="bold"
          />
          <ScriptLink
            slug="linear-b"
            name="Linear B"
            symbol="𐀀"
          />
        </Grid>
      </div>
    </>
  )
}

function ScriptLink({
  className,
  slug,
  name,
  script,
  symbol,
  disabled = false,
  weight,
}: {
  className?: string
  slug: string
  name: string
  script?: string
  disabled?: boolean
  symbol?: string
  weight?: string
}) {
  if (disabled) {
    return (
      <div
        className={clsx(
          className,
          'shadow-small1 flex flex-col bg-gray-100 text-left p-16 h-full leading-content rounded-sm w-full',
        )}
      >
        {symbol && (
          <T
            // script={script}
            tag="i"
            className={clsx(
              weight && `font-${weight}`,
              'block text-mega leading-content text-gray-800',
            )}
          >
            {symbol}
          </T>
        )}
        <T className="block font-semibold lowercase text-h4 leading-content text-gray-500">
          {name}
        </T>
      </div>
    )
  }

  return (
    <NextLink
      href={`/scripts/${slug}`}
      className={clsx(
        className,
        ' text-center shadow-small1 hover:shadow-small2 flex flex-col bg-gray-50 [&>div]:hover:text-violet-600 [&>div]:transition-colors transition-all duration-200 p-16 h-full leading-content rounded-sm w-full [&_span]:hover:text-violet-600 [&_i]:hover:text-violet-600',
      )}
    >
      {symbol && (
        <T
          // script={script}
          tag="i"
          className={clsx(
            weight && `font-${weight}`,
            'block text-mega leading-content text-gray-800 transition-colors',
          )}
        >
          {symbol}
        </T>
      )}
      <T className="block font-semibold lowercase text-h4 leading-content text-gray-500 transition-colors">
        {name}
      </T>
    </NextLink>
  )
}
