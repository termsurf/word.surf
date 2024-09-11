'use client'

import { H1 } from '@termsurf/leaf/component/Content'
import Environment from '@termsurf/leaf/component/Environment'
import Toast from '@termsurf/leaf/component/Toast'
import { FONT, SCRIPT } from '@termsurf/leaf/constant/settings'
import useFonts from '@termsurf/leaf/hook/useFonts'
import { usePageSettings } from '@termsurf/leaf/hook/usePageSettings'

import { Language, LanguageComponentItem } from '~/data/types'

import { Cached } from './config'

const KEY = '/languagse/language/components/component'

type PageInput = {
  language: Language
  component: LanguageComponentItem
}

export default function Page({ language, component }: PageInput) {
  return (
    <Environment settings={{ fonts: FONT, scripts: SCRIPT }}>
      <Content
        language={language}
        component={component}
      />
    </Environment>
  )
}

type ContentInput = PageInput

function Content({ language, component }: ContentInput) {
  useFonts(['Tone Etch'])

  return (
    <>
      <Header language={language} />
      <Body
        language={language}
        component={component}
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
      <H1>{language.name} component</H1>
    </header>
  )
}

const TERMS = [{}]

function Body({ language, component }: ContentInput) {
  return (
    <>
      <div className="relative w-full pb-64 whitespace-pre font-NotoSansMono">
        {JSON.stringify(component, null, 2)}
      </div>
    </>
  )
}
