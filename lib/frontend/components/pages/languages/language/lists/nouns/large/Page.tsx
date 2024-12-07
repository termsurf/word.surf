/* eslint-disable simple-import-sort/imports */

'use client'

import Toast from '@termsurf/leaf/component/Toast'
import useFonts from '@termsurf/leaf/hook/useFonts'
import { usePageSettings } from '@termsurf/leaf/hook/usePageSettings'
import Environment from '~/lib/frontend/components/Environment'

import {
  Language,
  LanguageItem,
  LanguageListItem,
} from '~/lib/shared/constants'

import Text from '@termsurf/leaf/component/Text'
import Link from 'next/link'
import SML from '~/lib/frontend/components/SML'
import Title from '~/lib/frontend/components/Title'
import {
  languageStringPath,
  slugify,
} from '~/lib/shared/utilities/paths'

export const CACHED = {}

export type Cached = {}

const KEY = '/languages/language/lists/nouns/medium'

type PageInput = {
  language: Language
  languages: Array<LanguageItem>
  items: Array<LanguageListItem>
}

export default function Page(props: PageInput) {
  return (
    <Environment>
      <Content {...props} />
    </Environment>
  )
}

type ContentInput = PageInput

function Content(props: ContentInput) {
  useFonts(['Tone Etch', 'Noto Serif Tibetan'])

  return (
    <>
      <Header {...props} />
      <Body {...props} />
      <Toast />
    </>
  )
}

function Header({ language }: ContentInput) {
  const { cached } = usePageSettings<any, Cached>()

  return (
    <header className="mt-64">
      <Title size="large">Nouns</Title>
      <div className="mt-32">
        <SML
          type="nouns"
          active="large"
          language={language}
        />
      </div>
    </header>
  )
}

function Body({ language, languages, items }: ContentInput) {
  return (
    <>
      <div className="relative w-full pb-64">
        {items.map(item => {
          const [english, translation] = item.translations
          return (
            <div
              key={item.id}
              className="p-16 flex justify-between even:bg-zinc-50 gap-16"
            >
              <div className="flex flex-col gap-24">
                <Text className="block text-lg text-zinc-600 font-bold">
                  {english.components[0]?.text}
                </Text>
                {translation.components.length ? (
                  translation.components.map((component, i) => (
                    <Link
                      key={i}
                      href={languageStringPath({
                        language: language.slug,
                        component: slugify(component.text),
                      })}
                    >
                      <Text
                        className="block hover:text-violet-600 transition-colors text-wrap"
                        key={component.id}
                        script="tibetan"
                        size={24}
                      >
                        {component.text}
                      </Text>
                    </Link>
                  ))
                ) : (
                  <Text className="block text-zinc-400">
                    [--------]
                  </Text>
                )}
              </div>
              <Text className="text-zinc-400 select-none">
                {item.position}
              </Text>
            </div>
          )
        })}
      </div>
    </>
  )
}
