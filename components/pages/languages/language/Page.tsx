'use client'

import { H1 } from '@termsurf/leaf/component/Content'
import Environment from '@termsurf/leaf/component/Environment'
import Toast from '@termsurf/leaf/component/Toast'
import { FONT, SCRIPT } from '@termsurf/leaf/constant/settings'
import useFonts from '@termsurf/leaf/hook/useFonts'
import { usePageSettings } from '@termsurf/leaf/hook/usePageSettings'

import { Language } from '~/data/types'

import { Cached } from './config'

const KEY = '/languages/language'

type PageInput = {
  language: Language
}

export default function Page({ language }: PageInput) {
  return (
    <Environment settings={{ fonts: FONT, scripts: SCRIPT }}>
      <Content language={language} />
    </Environment>
  )
}

type ContentInput = PageInput

function Content({ language }: ContentInput) {
  useFonts(['Tone Etch'])

  return (
    <>
      <Header language={language} />
      <Body language={language} />
      <Toast />
    </>
  )
}

function Header({ language }: ContentInput) {
  const { cached } = usePageSettings<any, Cached>()

  return (
    <header>
      <H1>The {language.name} Language</H1>
    </header>
  )
}

const TERMS = [{}]

function Body({ language }: ContentInput) {
  return (
    <>
      <div className="relative w-full pb-64"></div>
    </>
  )
}
