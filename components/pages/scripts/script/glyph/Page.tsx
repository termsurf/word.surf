'use client'

import { H1 } from '@termsurf/leaf/component/Content'
import Environment from '@termsurf/leaf/component/Environment'
import Toast from '@termsurf/leaf/component/Toast'
import { FONT, SCRIPT } from '@termsurf/leaf/constant/settings'
import { usePageSettings } from '@termsurf/leaf/hook/usePageSettings'
import useScripts from '@termsurf/leaf/hook/useScripts'

import Text from '@termsurf/leaf/component/Text'
import Link from 'next/link'
import { PageLink } from '../glyphs/Page'
import GlyphsLink from '../GlyphsLink'
import { Cached } from './config'

const KEY = '/languages'

export type GridLink = {
  title: string
  description?: string
  path: string
}

type PageInput = {
  scriptSlug: string
  glyph: string
  links: Array<PageLink>
}

export default function GlyphPage(props: PageInput) {
  return (
    <Environment settings={{ fonts: FONT, scripts: SCRIPT }}>
      <Content {...props} />
    </Environment>
  )
}

type ContentInput = PageInput

function Content(props: ContentInput) {
  useScripts([props.scriptSlug, 'latin'])

  return (
    <>
      <Header {...props} />
      <Body {...props} />
      <Toast />
    </>
  )
}

function Header({ scriptSlug, glyph }: ContentInput) {
  const { cached } = usePageSettings<any, Cached>()

  return (
    <header>
      <H1 className="flex flex-col">
        <Text
          script={scriptSlug}
          className="block mt-16 text-super-duper-mega !sm:text-super-duper-mega-large font-bold"
        >
          {glyph}
        </Text>
        <Link
          href={`/scripts/${scriptSlug}`}
          className="block uppercase scale-y-80 tracking-wide-015 text-h4 sm:text-h4-large text-gray-400 hover:text-violet-400 transition-colors mb-4"
        >
          <Text script="latin">{scriptSlug.replace(/-/g, ' ')}</Text>
        </Link>
      </H1>
    </header>
  )
}

function Body({ links, scriptSlug }: ContentInput) {
  return (
    <>
      <div className="relative w-full pb-64 flex flex-col gap-16 p-16">
        {links.map(link => (
          <GlyphsLink
            key={link.slug}
            name={link.name}
            slug={`${scriptSlug}/${link.slug}`}
            symbols={link.symbols}
            script={scriptSlug}
          />
        ))}
      </div>
    </>
  )
}