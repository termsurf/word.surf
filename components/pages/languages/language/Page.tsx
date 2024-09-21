'use client'

import { H1 } from '@termsurf/leaf/component/Content'
import Environment from '@termsurf/leaf/component/Environment'
import Toast from '@termsurf/leaf/component/Toast'
import { FONT, SCRIPT } from '@termsurf/leaf/constant/settings'
import useFonts from '@termsurf/leaf/hook/useFonts'
import { usePageSettings } from '@termsurf/leaf/hook/usePageSettings'

import NextLink from 'next/link'
import Link from '~/components/Link'
import { Language, LanguageListItem } from '~/data/types'
import { languageComponentsPath } from '~/tools/paths'

import { LinkButton } from '@termsurf/leaf/component/Button'
import Grid from '@termsurf/leaf/component/Grid'
import Text from '@termsurf/leaf/component/Text'
import { Cached } from './config'

const KEY = '/languages/language'

type PageInput = {
  language: Language
  items: Array<LanguageListItem>
}

export default function Page({ language, items }: PageInput) {
  return (
    <Environment settings={{ fonts: FONT, scripts: SCRIPT }}>
      <Content
        language={language}
        items={items}
      />
    </Environment>
  )
}

type ContentInput = PageInput

function Content({ language, items }: ContentInput) {
  useFonts(['Tone Etch', 'Noto Serif Tibetan'])

  return (
    <>
      <Header
        language={language}
        items={items}
      />
      <Body
        language={language}
        items={items}
      />
      <Toast />
    </>
  )
}

function Header({ language }: ContentInput) {
  const { cached } = usePageSettings<any, Cached>()

  return (
    <header>
      <H1 className="flex flex-col !mb-16">
        <span className="block uppercase scale-y-[0.8] tracking-wide-015">
          {language.name}
        </span>
        <NextLink
          href="/languages"
          className="block lowercase text-sm text-gray-400"
        >
          Language
        </NextLink>
        {/* <span className="block text-base font-normal">
          A language of the Himalayas
        </span> */}
      </H1>
    </header>
  )
}

function Body({ language, items }: ContentInput) {
  return (
    <>
      <div className="relative w-full pb-64 p-16 flex flex-col gap-16">
        {/* <TextInput
          size="large"
          placeholder="Search..."
        /> */}

        <div className="flex flex-wrap gap-16 items-center justify-center mb-32">
          {items
            .slice(0, 4)
            .filter(item => item.translations[1].components[0]?.text)
            .map((item, i) => (
              <Text
                key={i}
                script="tibetan"
                className="hover:text-violet-600 transition-colors cursor-pointer text-center text-4xl font-bold pt-16"
              >
                {item.translations[1].components[0]?.text}
              </Text>
            ))}
        </div>
        {/* <P>
          ༈
          འགྲོ་བ་མིའི་ཁྱིམ་ཚང་ཁག་གི་ནང་མི་ཡོངས་ལ་རང་བཞིན་ཉིད་ནས་ཡོད་པའི་ཆེ་མཐོངས་དང་འདྲ་མཉམ།
          སུས་ཀྱང་འཕྲོག་ཏུ་མི་རུང་བའི་ཐོབ་ཐང་བཅས་ཀྱི་གནད་དོན་རྟོགས
          པར་བྱེད་པ་ནི། འཛམ་གླིང་ནང་གི་རང་དབང་དང༌། དྲང་བདེན།
          ཞི་བདེ་བཅས་ཀྱི་རྣང་གཞི་ལྟེ་བ་ཡིན།
        </P> */}
        <Grid
          maxColumns={2}
          minWidth={320}
          gap={16}
        >
          <Link
            title="Lists"
            description="Browse through vocabulary lists"
            path={`/languages/${language.slug}/lists`}
          />
          <Link
            title="Symbols"
            description={`Examine the ${language.name} glyphs`}
            path={`/languages/${language.slug}/symbols`}
          />
          <Link
            disabled
            title="Sounds"
            description="Hear the language sounds"
            path={`/languages/${language.slug}/sounds`}
          />
          <Link
            disabled
            title="Guides"
            description="Learn the language rules"
            path={`/languages/${language.slug}/guides`}
          />
          <Link
            disabled
            title="Texts"
            description={`Read some ${language.name} content`}
            path={`/languages/${language.slug}/texts`}
          />
          <Link
            disabled
            title="Components"
            description="Explore the dictionary itself"
            path={languageComponentsPath({ language: language.slug })}
          />
          <Link
            disabled
            title="Games"
            description="Play some useful games"
            path={`/languages/${language.slug}/games`}
          />
          <Link
            disabled
            title="Keyboards"
            description={`Write something in ${language.name}`}
            path={`/languages/${language.slug}/keyboards`}
          />
        </Grid>
        <div className="flex w-full justify-center p-16">
          <LinkButton
            color="purple"
            size="large"
            href="https://github.com/termsurf/chat.surf"
          >
            Contribute!
          </LinkButton>
        </div>
      </div>
    </>
  )
}
