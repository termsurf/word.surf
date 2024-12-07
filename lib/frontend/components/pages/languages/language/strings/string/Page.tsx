'use client'

import { H1, P } from '@termsurf/leaf/component/Content'
import Toast from '@termsurf/leaf/component/Toast'
import useFonts from '@termsurf/leaf/hook/useFonts'
import { usePageSettings } from '@termsurf/leaf/hook/usePageSettings'
import Environment from '~/lib/frontend/components/Environment'

import { Language, LanguageComponentItem } from '~/lib/shared/constants'

export const CACHED = {}

export type Cached = {}

const PATH = '/language/language/components/component'

type PageInput = {
  language: Language
  component: LanguageComponentItem
}

export default function Page({ language, component }: PageInput) {
  return (
    <Environment>
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
      <Header
        language={language}
        component={component}
      />
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
  component: LanguageComponentItem
}

function Header({ language, component }: HeaderInput) {
  const { cached } = usePageSettings<any, Cached>()

  return (
    <header className="mt-64">
      <H1 className="!text-6xl">{component.text}</H1>
      <P align="center">{component.definitions[0]?.text}</P>
    </header>
  )
}

function Body({ language, component }: ContentInput) {
  return (
    <>
      <div className="relative w-full pb-64 whitespace-pre font-NotoSansMono">
        {component.definitions.map(def => (
          <P
            className="mb-8"
            key={def.id}
          >
            {def.text}
          </P>
        ))}
      </div>
    </>
  )
}
