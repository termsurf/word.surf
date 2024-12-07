'use client'

import { H1 } from '@termsurf/leaf/component/Content'
import Layout from '@termsurf/leaf/component/Layout'
import Toast from '@termsurf/leaf/component/Toast'
import NextLink from 'next/link'
import Environment from '~/lib/frontend/components/Environment'
import GridLink from '~/lib/frontend/components/GridLink'
import { Language, LanguageListItem } from '~/lib/shared/constants'
import { languageStringsPath } from '~/lib/shared/utilities/paths'

import { LinkButton } from '@termsurf/leaf/component/Button'
import Grid from '@termsurf/leaf/component/Grid'
import Text from '@termsurf/leaf/component/Text'
import useScripts from '@termsurf/leaf/hook/useScripts'
import { useState } from 'react'
import {
  BoxedHomeIcon,
  BoxedPencilIcon,
  RightPencilIcon,
} from '../../../icons'

export const CACHED = {}

export type Cached = {}

const PATH = '/languages/language'

type PageInput = {
  language: Language
  items: Array<LanguageListItem>
}

export default function Page({ language, items }: PageInput) {
  return (
    <Environment>
      <Content
        language={language}
        items={items}
      />
    </Environment>
  )
}

type ContentInput = PageInput

function Content({ language, items }: ContentInput) {
  useScripts(['code'])
  const [layout, setLayout] = useState('right')

  return (
    <Layout
      onShift={setLayout}
      topLeft={<BoxedHomeIcon />}
      topCenter={layout === 'center' && <BoxedHomeIcon />}
      bottomRight={
        <RightPencilIcon href={`/languages/${language.slug}/create`} />
      }
      bottomCenter={
        <div className="flex w-full h-full justify-between items-center">
          <div className="w-40" />
          <LinkButton
            color="purple"
            size="medium"
            href="https://github.com/termsurf/word.surf"
            className="lowercase"
          >
            Contribute!
          </LinkButton>
          {layout !== 'right' ? (
            <BoxedPencilIcon
              href={`/languages/${language.slug}/create`}
            />
          ) : (
            <div className="w-40" />
          )}
        </div>
      }
    >
      <div className="mt-32">
        <Header
          language={language}
          items={items}
        />
        <Body
          language={language}
          items={items}
        />
        <Toast />
      </div>
    </Layout>
  )
}

function Header({ language }: ContentInput) {
  return (
    <header className="mt-64">
      <H1 className="!mb-0">
        <span>{language.name}</span>
      </H1>
      <NextLink
        href="/languages"
        className="text-center mx-16 block lowercase text-sm text-zinc-400 hover:text-violet-400 transition-colors"
      >
        <Text>Language</Text>
      </NextLink>
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
          <GridLink
            title="Lists"
            description="Browse through vocabulary lists"
            href={`/languages/${language.slug}/lists`}
          />
          <GridLink
            title="Symbols"
            description={`Examine the ${language.name} glyphs`}
            href={`/languages/${language.slug}/symbols`}
          />
          <GridLink
            disabled
            title="Sounds"
            description="Hear the language sounds"
            href={`/languages/${language.slug}/sounds`}
          />
          <GridLink
            disabled
            title="Guides"
            description="Learn the language rules"
            href={`/languages/${language.slug}/guides`}
          />
          <GridLink
            disabled
            title="Texts"
            description={`Read some ${language.name} content`}
            href={`/languages/${language.slug}/texts`}
          />
          <GridLink
            title="Strings"
            description="Explore the dictionary itself"
            href={languageStringsPath({ language: language.slug })}
          />
          <GridLink
            disabled
            title="Games"
            description="Play some useful games"
            href={`/languages/${language.slug}/games`}
          />
          <GridLink
            disabled
            title="Keyboards"
            description={`Write something in ${language.name}`}
            href={`/languages/${language.slug}/keyboards`}
          />
        </Grid>
      </div>
    </>
  )
}
