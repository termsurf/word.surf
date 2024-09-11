'use client'

import { H1 } from '@termsurf/leaf/component/Content'
import Environment from '@termsurf/leaf/component/Environment'
import Grid from '@termsurf/leaf/component/Grid'
import Toast from '@termsurf/leaf/component/Toast'
import { FONT, SCRIPT } from '@termsurf/leaf/constant/settings'
import useFonts from '@termsurf/leaf/hook/useFonts'
import { usePageSettings } from '@termsurf/leaf/hook/usePageSettings'

import Link from '~/components/Link'
import { Language } from '~/data/types'

import { Cached } from './config'

const KEY = '/languages'

export type GridLink = {
  title: string
  description?: string
  path: string
}

type PageInput = {
  languages: {
    size: number
    list: Array<Language>
  }
}

export default function Page({ languages }: PageInput) {
  return (
    <Environment settings={{ fonts: FONT, scripts: SCRIPT }}>
      <Content languages={languages} />
    </Environment>
  )
}

type ContentInput = PageInput

function Content({ languages }: ContentInput) {
  useFonts(['Tone Etch'])

  return (
    <>
      <Header />
      <Body languages={languages} />
      <Toast />
    </>
  )
}

function Header() {
  const { cached } = usePageSettings<any, Cached>()

  return (
    <header>
      <H1>Languages</H1>
    </header>
  )
}

const TERMS = [{}]

function Body({ languages }: ContentInput) {
  return (
    <>
      <div className="relative w-full pb-64">
        <Grid
          minWidth={144}
          gap={16}
          maxColumns={2}
          className="p-16"
        >
          {languages.list.map(x => (
            <Link
              key={x.id}
              path={`/language/${x.slug}`}
              title={x.name}
            />
          ))}
        </Grid>
      </div>
    </>
  )
}
