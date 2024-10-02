'use client'

import { H1, P } from '@termsurf/leaf/component/Content'
import Environment from '@termsurf/leaf/component/Environment'
import Toast from '@termsurf/leaf/component/Toast'
import useFonts from '@termsurf/leaf/hook/useFonts'
import { usePageSettings } from '@termsurf/leaf/hook/usePageSettings'
import { FONT, SCRIPT } from '~/data/fonts'

import HeaderContextButton from '~/components/HeaderContextButton'
import { Language, LanguageComponentItem } from '~/data/types'
import { languagePath } from '~/tools/paths'

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
      <HeaderContextButton
        href={languagePath({ language: language.slug })}
      >
        {language.name}
      </HeaderContextButton>
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
