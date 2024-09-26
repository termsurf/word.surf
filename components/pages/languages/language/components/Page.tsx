'use client'

import { H1 } from '@termsurf/leaf/component/Content'
import Environment from '@termsurf/leaf/component/Environment'
import Toast from '@termsurf/leaf/component/Toast'
import { FONT, SCRIPT } from '@termsurf/leaf/constant/settings'
import useFonts from '@termsurf/leaf/hook/useFonts'
import { usePageSettings } from '@termsurf/leaf/hook/usePageSettings'

import Entry from '~/components/Entry'
import HeaderContextButton from '~/components/HeaderContextButton'
import { Language, LanguageComponentItem, List } from '~/data/types'
import { languageComponentPath, languagePath } from '~/tools/paths'

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
    <header className="mt-64">
      <HeaderContextButton
        href={languagePath({ language: language.slug })}
      >
        {language.name}
      </HeaderContextButton>
      <H1 className="uppercase scale-y-80 tracking-wide-015">
        Components
      </H1>
    </header>
  )
}

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
              role={x.role}
              ipa={x.expressions[0]?.pronunciations[0]?.text}
              definition={x.definitions[0]?.text}
              nativeClassName="!text-3xl"
            />
          ))}
        </Entry.List>
      </div>
    </>
  )
}
