'use client'

import { H1 } from '@termsurf/leaf/component/Content'
import Environment from '@termsurf/leaf/component/Environment'
import Grid from '@termsurf/leaf/component/Grid'
import Toast from '@termsurf/leaf/component/Toast'
import { FONT, SCRIPT } from '@termsurf/leaf/constant/settings'
import useFonts from '@termsurf/leaf/hook/useFonts'
import { usePageSettings } from '@termsurf/leaf/hook/usePageSettings'

import Link from '~/component/Link'
import { Language, LanguageComponentItem } from '~/schema/language'
import { List } from '~/schema/list'

import { Cached } from './config'

const KEY = '/language/type/components'

type PageInput = {
  language: Language
  components: List<LanguageComponentItem>
}

export default function Page({ language, components }: PageInput) {
  return (
    <Environment settings={{ fonts: FONT, scripts: SCRIPT }}>
      <Content
        language={language}
        components={components}
      />
    </Environment>
  )
}

type ContentInput = PageInput

function Content({ language, components }: ContentInput) {
  useFonts(['Tone Etch'])

  return (
    <>
      <Header language={language} />
      <Body
        language={language}
        components={components}
      />
      <Toast />
    </>
  )
}

type HeaderInput = {
  language: Language
}

function Header({ language }: HeaderInput) {
  const { cached } = usePageSettings<any, Cached>()

  return (
    <header>
      <H1>{language.name} Components</H1>
    </header>
  )
}

const TERMS = [{}]

function Body({ language, components }: ContentInput) {
  return (
    <>
      <div className="relative w-full pb-64">
        <Grid
          minWidth={400}
          gap={16}
          maxColumns={2}
          className="p-16"
        >
          {components.list.map(x => (
            <Link
              key={x.id}
              path={`/language/${language.slug}/components/${x.slug}`}
              title={x.slug}
            />
          ))}
        </Grid>
      </div>
    </>
  )
}
