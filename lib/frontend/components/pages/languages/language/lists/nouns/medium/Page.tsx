/* eslint-disable simple-import-sort/imports */

'use client'

import {
  Table,
  TableScroller,
  TBody,
  TD,
  TH,
  THead,
  TR,
} from '@termsurf/leaf/component/Content'
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
import SML from '~/lib/frontend/components/SML'
import Title from '~/lib/frontend/components/Title'

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
  useFonts(['Tone Etch'])

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
      <Title size="medium">Nouns</Title>
      <SML
        type="nouns"
        active="medium"
        language={language}
      />
    </header>
  )
}

function Body({ language, languages, items }: ContentInput) {
  return (
    <>
      <div className="relative w-full pb-64">
        <TableScroller>
          <Table>
            <THead>
              <TR>
                <TH>English</TH>
                <TH>{languages[1].name}</TH>
              </TR>
            </THead>
            <TBody>
              {items.map(item => {
                const [english, translation] = item.translations
                return (
                  <TR key={item.id}>
                    <TD>
                      <Text>{english.components[0]?.text}</Text>
                    </TD>
                    <TD>
                      <Text>{translation.components[0]?.text}</Text>
                    </TD>
                  </TR>
                )
              })}
            </TBody>
          </Table>
        </TableScroller>
        {/* <Grid
          minWidth={256}
          maxColumns={4}
          breakpoints={[4, 2, 1]}
          gap={16}
        >
          <ImageTerm
            image={images.rock}
            term={terms.rock}
          />
          <ImageTerm
            image={images.tree}
            term={terms.tree}
          />
        </Grid> */}
      </div>
    </>
  )
}
