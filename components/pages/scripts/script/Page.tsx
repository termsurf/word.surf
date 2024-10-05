'use client'

import { H1 } from '@termsurf/leaf/component/Content'
import Environment from '@termsurf/leaf/component/Environment'
import Toast from '@termsurf/leaf/component/Toast'
import useFonts from '@termsurf/leaf/hook/useFonts'
import { usePageSettings } from '@termsurf/leaf/hook/usePageSettings'
import useScripts from '@termsurf/leaf/hook/useScripts'
import { FONT, SCRIPT } from '~/data/fonts'

import Link from 'next/link'
import { PageLink } from './glyphs/Page'
import GlyphsLink from './GlyphsLink'

export const CACHED = {}

export type Cached = {}

const KEY = '/languages'

const HEBREW = {
  time: '~1000 BCE',
  base: 'consonants (abjad)',
  direction: 'right-to-left',
  spaces: 'none in ancient texts',
  pause_markers: 'introduced later (punctuation)',
  phonetic: 'yes',
  numerals: 'Gematria (letters represent numbers)',
  combining_marks: 'diacritics (Niqqud, cantillation marks)',
  sources: 'Proto-Sinaitic, Phoenician',
  languages: ['Hebrew', 'Yiddish', 'Ladino'],
  places: ['Israel', 'Jewish diaspora'],
  line: 'no top-line connection',
  vowels: 'indicated with Niqqud (dots and dashes)',
  clusters: 'consonant clusters allowed',
  time_periods: ['Biblical Hebrew', 'Medieval Hebrew', 'Modern Hebrew'],
  evolution: 'Canaanite to Paleo-Hebrew to Square Hebrew',
  modern_adoption: 'revived as the official script of Modern Hebrew',
  punctuation: 'period, comma, question mark, etc. (modern use)',
  phonemes: 'corresponds to consonants, vowels indicated by marks',
  regional_variants: ['Sephardic, Ashkenazi pronunciation'],
  script_family: 'Semitic abjad',
}

export type GridLink = {
  title: string
  description?: string
  path: string
}

type PageInput = {
  scriptSlug: string
  links: Array<PageLink>
}

export default function ScriptPage(props: PageInput) {
  return (
    <Environment settings={{ fonts: FONT, scripts: SCRIPT }}>
      <Content {...props} />
    </Environment>
  )
}

type ContentInput = PageInput

function Content(props: ContentInput) {
  useScripts([props.scriptSlug])
  useFonts(['Tone Etch'])

  return (
    <>
      <Header {...props} />
      <Body {...props} />
      <Toast />
    </>
  )
}

function Header({ scriptSlug }: ContentInput) {
  const { cached } = usePageSettings<any, Cached>()

  return (
    <header className="mt-64">
      <H1 className="flex flex-col">
        <span className="block uppercase scale-y-80 tracking-wide-015">
          {scriptSlug.replace(/-/g, ' ')}
        </span>
        <Link
          href="/scripts"
          className="block lowercase text-sm text-gray-400 hover:text-violet-400 transition-colors"
        >
          Script
        </Link>
      </H1>
    </header>
  )
}

function Body({ links, scriptSlug }: ContentInput) {
  return (
    <>
      <div className="relative w-full pb-64 flex flex-col gap-16 p-16">
        {/* <Grid
          maxColumns={2}
          gap={16}
          minWidth={320}
        >
          {Object.keys(HEBREW).map(key => (
            <div key={key}>
              <Text className="block text-xs text-gray-500">{key}</Text>
              <Text className="text-gray-950">{HEBREW[key]}</Text>
            </div>
          ))}
        </Grid> */}
        {links.map(link => (
          <GlyphsLink
            key={link.slug}
            name={link.name}
            slug={`${scriptSlug}/${link.slug}`}
            symbols={link.symbols}
            script={scriptSlug}
          />
        ))}
        {/*
        <Grid
          maxColumns={4}
          minWidth={160}
          gap={16}
          breakpoints={[4, 2, 1]}
        >
          <GridLink
            title="features"
            path={`/scripts/${scriptSlug}/features`}
          />
          <GridLink
            title="symbols"
            path={`/scripts/${scriptSlug}/symbols`}
          />
          <GridLink
            disabled
            title="styles"
            path={`/scripts/${scriptSlug}/styles`}
          />
          <GridLink
            disabled
            title="fonts"
            path={`/scripts/${scriptSlug}/fonts`}
          />
          <GridLink
            disabled
            title="comparisons"
            path={`/scripts/${scriptSlug}/comparisons`}
          />
          <GridLink
            disabled
            title="languages"
            path={`/scripts/${scriptSlug}/languages`}
          />
          <GridLink
            disabled
            title="keyboards"
            path={`/scripts/${scriptSlug}/keyboards`}
          />
          <GridLink
            title="resources"
            path={`/scripts/${scriptSlug}/resources`}
          />
        </Grid> */}
      </div>
    </>
  )
}
