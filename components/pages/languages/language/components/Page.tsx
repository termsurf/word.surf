'use client'

import { H1 } from '@termsurf/leaf/component/Content'
import Environment from '@termsurf/leaf/component/Environment'
import Toast from '@termsurf/leaf/component/Toast'
import { FONT, SCRIPT } from '@termsurf/leaf/constant/settings'
import useFonts from '@termsurf/leaf/hook/useFonts'
import { usePageSettings } from '@termsurf/leaf/hook/usePageSettings'

import Entry from '~/components/Entry'
import { Language, LanguageComponentItem, List } from '~/data/types'
import { languageComponentPath } from '~/tools/paths'

import { Cached } from './config'

const KEY = '/languagse/language/components'

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
        <Entry.List>
          {components.list.map(x => (
            <Entry
              key={x.id}
              path={languageComponentPath({
                language: language.slug,
                component: x.text,
              })}
              native={x.text}
              nativeClassName="text-2xl"
            />
          ))}
        </Entry.List>
      </div>
    </>
  )
}
