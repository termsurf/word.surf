'use client'

import { H1 } from '@termsurf/leaf/component/Content'
import Toast from '@termsurf/leaf/component/Toast'
import { usePageSettings } from '@termsurf/leaf/hook/usePageSettings'
import useScripts from '@termsurf/leaf/hook/useScripts'
import Environment from '~/lib/frontend/components/Environment'

import Layout from '@termsurf/leaf/component/Layout'
import Text from '@termsurf/leaf/component/Text'
import Link from 'next/link'
import GlyphsLink from '../../../GlyphsLink'
import { PageLink } from './glyphs/Page'

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
    <Environment>
      <Content {...props} />
    </Environment>
  )
}

type ContentInput = PageInput

function Content(props: ContentInput) {
  useScripts([props.scriptSlug, 'code'])

  return (
    <Layout>
      <div className="mt-32">
        <Header {...props} />
        <Body {...props} />
        <Toast />
      </div>
    </Layout>
  )
}

function Header({ scriptSlug }: ContentInput) {
  const { cached } = usePageSettings<any, Cached>()

  return (
    <header className="mt-64 mb-32">
      <H1 className="flex flex-col">{scriptSlug.replace(/-/g, ' ')}</H1>
      <Link
        href="/scripts"
        className="text-center mx-16 block lowercase text-sm text-zinc-400 hover:text-violet-400 transition-colors"
      >
        <Text>Script</Text>
      </Link>
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
              <Text className="block text-xs text-zinc-500">{key}</Text>
              <Text className="text-zinc-950">{HEBREW[key]}</Text>
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
