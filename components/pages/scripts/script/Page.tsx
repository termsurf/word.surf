'use client'

import { H1 } from '@termsurf/leaf/component/Content'
import Environment from '@termsurf/leaf/component/Environment'
import Toast from '@termsurf/leaf/component/Toast'
import { FONT, SCRIPT } from '@termsurf/leaf/constant/settings'
import useFonts from '@termsurf/leaf/hook/useFonts'
import { usePageSettings } from '@termsurf/leaf/hook/usePageSettings'

import Link from 'next/link'
import { Cached } from './config'
import { PageLink } from './glyphs/Page'
import GlyphsLink from './GlyphsLink'

const KEY = '/languages'

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
    <header>
      <H1 className="flex flex-col">
        <span className="block uppercase scale-y-80 tracking-wide-015 hover:text-violet-600 transition-colors">
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
