'use client'

import Layout from '@termsurf/leaf/component/Layout'
import clsx from 'clsx'
import NextLink from 'next/link'

import T from '@termsurf/leaf/component/Text'

import { H1, P } from '@termsurf/leaf/component/Content'
import Grid from '@termsurf/leaf/component/Grid'
import Toast from '@termsurf/leaf/component/Toast'
import Environment from '~/lib/frontend/components/Environment'

import { LinkButton } from '@termsurf/leaf/component/Button'
import useScripts from '@termsurf/leaf/hook/useScripts'
import { useState } from 'react'
import { useGetLanguagesQuery } from '~/lib/frontend/queries'
import { languagePath } from '~/lib/shared/utilities/paths'
import { GRID_LINK_COLORS, GridLinkColor } from '../../GridLink'
import { BoxedHomeIcon } from '../../icons'

export const CACHED = {}

export type Cached = {}

const KEY = '/languages'

export type GridLink = {
  title: string
  description?: string
  path: string
}

export default function Page() {
  return (
    <Environment>
      <Content />
    </Environment>
  )
}

function Content() {
  useScripts(['code'])
  const [layout, setLayout] = useState('right')

  return (
    <Layout
      onShift={setLayout}
      topLeft={<BoxedHomeIcon />}
      topCenter={layout === 'center' && <BoxedHomeIcon />}
      // bottomCenter={
      //   layout !== 'right' && (
      //     <div className="flex justify-center px-16 py-8">
      //       <LinkButton
      //         size="medium"
      //         color="green"
      //         href="/languages/create"
      //         className="lowercase"
      //       >
      //         Create Language
      //       </LinkButton>
      //     </div>
      //   )
      // }
      right={
        <Layout.Side>
          <div className="h-full pt-64 p-16">
            <div className="flex justify-center">
              <LinkButton
                size="large"
                color="green"
                href="/languages/create"
                className="w-full lowercase"
              >
                Create Language
              </LinkButton>
            </div>
          </div>
        </Layout.Side>
      }
    >
      <Header />
      <Body />
      <Toast />
    </Layout>
  )
}

function Header() {
  return (
    <header className="mt-96">
      <H1>Languages</H1>
      <P
        align="center"
        type="secondary"
      >
        Explore the world&apos;s languages
      </P>
    </header>
  )
}

function Body() {
  const { data, error, isLoading } = useGetLanguagesQuery({})

  // if (isLoading) {
  //   return
  // }

  // if (error) return <p>Error fetching languages</p>

  useScripts([
    'chinese',
    'devanagari',
    'hebrew',
    'arabic',
    'latin',
    'greek',
    'tibetan',
    'tamil',
    'burmese',
    'telugu',
    'gurmukhi',
    'thai',
  ])

  return (
    <>
      <div className="relative w-full pb-64 flex flex-col gap-16 p-16">
        <Grid
          minWidth={264}
          gap={16}
          maxColumns={3}
        >
          <LanguageLink
            disabled
            name="Mandarin"
            slug="mandarin"
            script="chinese"
            native="汉字"
          />
          <LanguageLink
            disabled
            name="Sanskrit"
            slug="sanskrit"
            script="devanagari"
            native="संस्कृतम्"
          />
          <LanguageLink
            disabled
            name="Hebrew"
            slug="hebrew"
            script="hebrew"
            native="עִבְרִית"
          />
          <LanguageLink
            disabled
            name="Arabic"
            slug="arabic"
            script="arabic"
            native="العربية"
          />
          <LanguageLink
            disabled
            name="Latin"
            slug="latin"
            script="latin"
            native="latīnī"
          />
          <LanguageLink
            disabled
            name="Ancient Greek"
            slug="ancient-greek"
            script="greek"
            native="ελληνικά"
          />
          <LanguageLink
            name="Tibetan"
            slug="tibetan"
            script="tibetan"
            native="བོད་ཡིག"
          />
          <LanguageLink
            disabled
            name="Tamil"
            slug="tamil"
            script="tamil"
            native="தமிழ்"
          />
          <LanguageLink
            disabled
            name="Burmese"
            slug="burmese"
            script="burmese"
            native="မြန်မာစာ"
          />
          <LanguageLink
            disabled
            name="Telugu"
            slug="telugu"
            script="telugu"
            native="తెలుగు"
          />
          <LanguageLink
            disabled
            name="Punjabi"
            slug="punjabi"
            script="gurmukhi"
            native="ਪੰਜਾਬੀ"
          />
          <LanguageLink
            disabled
            name="Thai"
            slug="thai"
            script="thai"
            native="ไทย"
          />
          {/* {languages.list.map(x => (
            <Link
              key={x.id}
              path={`/language/${x.slug}`}
              title={x.name}
            />
          ))} */}
        </Grid>
        <div className="flex justify-center p-16 pt-32 pb-64">
          <LinkButton
            href="/languages/ancient"
            size="large"
            className="lowercase"
          >
            More Ancient Languages
          </LinkButton>
        </div>
        <Grid
          minWidth={192}
          gap={16}
          maxColumns={4}
        >
          <LanguageLink
            disabled
            slug="spanish"
            name="Spanish"
          />
          <LanguageLink
            disabled
            slug="hindi"
            name="Hindi"
          />
          <LanguageLink
            disabled
            slug="bengali"
            name="Bengali"
          />
          <LanguageLink
            disabled
            slug="portuguese"
            name="Portuguese"
          />
          <LanguageLink
            disabled
            slug="japanese"
            name="Japanese"
          />
          <LanguageLink
            disabled
            slug="marathi"
            name="Marathi"
          />
          <LanguageLink
            disabled
            slug="korean"
            name="Korean"
          />
          <LanguageLink
            disabled
            slug="french"
            name="French"
          />
          <LanguageLink
            disabled
            slug="turkish"
            name="Turkish"
          />
          <LanguageLink
            disabled
            slug="vietnamese"
            name="Vietnamese"
          />
          <LanguageLink
            disabled
            slug="urdu"
            name="Urdu"
          />
          <LanguageLink
            disabled
            slug="indonesian"
            name="Indonesian"
          />
          <LanguageLink
            disabled
            slug="italian"
            name="Italian"
          />
          <LanguageLink
            disabled
            slug="gujarati"
            name="Gujarati"
          />
          <LanguageLink
            disabled
            slug="persian"
            name="Persian"
          />
          <LanguageLink
            disabled
            slug="german"
            name="German"
          />
          <LanguageLink
            disabled
            slug="hausa"
            name="Hausa"
          />
          <LanguageLink
            disabled
            slug="swahili"
            name="Swahili"
          />
          <LanguageLink
            disabled
            slug="tagalog"
            name="Tagalog"
          />
          <LanguageLink
            disabled
            slug="amharic"
            name="Amharic"
          />
          <LanguageLink
            disabled
            slug="kannada"
            name="Kannada"
          />
          <LanguageLink
            disabled
            slug="sinhala"
            name="Sinhala"
          />
          <LanguageLink
            disabled
            slug="finnish"
            name="Finnish"
          />
          <LanguageLink
            disabled
            slug="greek"
            name="Greek"
          />
        </Grid>

        <div className="flex justify-center p-16 pt-32 pb-64">
          <LinkButton
            href="/languages/popular"
            size="large"
            className="lowercase"
          >
            More Popular Languages
          </LinkButton>
        </div>
        <Grid
          minWidth={192}
          gap={16}
          maxColumns={4}
        >
          <LanguageLink
            disabled
            slug="elvish"
            name="Elvish"
          />
          <LanguageLink
            disabled
            slug="lojban"
            name="Lojban"
          />
          <LanguageLink
            disabled
            slug="dothraki"
            name="Dothraki"
          />
          <LanguageLink
            disabled
            slug="toki-pona"
            name="Toki Pona"
          />
          <LanguageLink
            disabled
            slug="dovahzul"
            name="Dovahzul"
          />
          <LanguageLink
            disabled
            slug="ithkuilic"
            name="Ithkuilic"
          />
          <LanguageLink
            disabled
            slug="klingon"
            name="Klingon"
          />
          <LanguageLink
            disabled
            slug="lapine"
            name="Lapine"
          />
          <LanguageLink
            disabled
            slug="navi"
            name="Navi"
          />
          <LanguageLink
            disabled
            slug="valyrian"
            name="Valyrian"
          />
          <LanguageLink
            disabled
            slug="volapuk"
            name="Volapuk"
          />
          <LanguageLink
            disabled
            slug="vulcan"
            name="Vulcan"
          />
        </Grid>
        <div className="flex justify-center p-16 pt-32 pb-64">
          <LinkButton
            href="/languages/constructed"
            size="large"
            className="lowercase"
          >
            More Constructed Languages
          </LinkButton>
        </div>

        <Grid
          minWidth={264}
          gap={16}
          maxColumns={3}
        >
          <LanguageLink
            disabled
            slug="xhosa"
            name="Xhosa"
          />
          <LanguageLink
            disabled
            slug="amazigh"
            name="Amazigh"
          />
          <LanguageLink
            disabled
            slug="armenian"
            name="Armenian"
          />
          <LanguageLink
            disabled
            slug="basque"
            name="Basque"
          />
          <LanguageLink
            disabled
            slug="bulgarian"
            name="Bulgarian"
          />
          <LanguageLink
            disabled
            slug="cantonese"
            name="Cantonese"
          />
          <LanguageLink
            disabled
            slug="czech"
            name="Czech"
          />
          <LanguageLink
            disabled
            slug="danish"
            name="Danish"
          />
          <LanguageLink
            disabled
            slug="dari"
            name="Dari"
          />
          <LanguageLink
            disabled
            slug="dutch"
            name="Dutch"
          />
          <LanguageLink
            disabled
            slug="hungarian"
            name="Hungarian"
          />
          <LanguageLink
            disabled
            slug="icelandic"
            name="Icelandic"
          />
          <LanguageLink
            disabled
            slug="igbo"
            name="Igbo"
          />
          <LanguageLink
            disabled
            slug="inuktitut"
            name="Inuktitut"
          />
          <LanguageLink
            disabled
            slug="irish"
            name="Irish"
          />
          <LanguageLink
            disabled
            slug="javanese"
            name="Javanese"
          />
          <LanguageLink
            disabled
            slug="khmer"
            name="Khmer"
          />
          <LanguageLink
            disabled
            slug="korean"
            name="Korean"
          />
          <LanguageLink
            disabled
            slug="kurdish-sorani"
            name="Kurdish Sorani"
          />
          <LanguageLink
            disabled
            slug="malayalam"
            name="Malayalam"
          />
          <LanguageLink
            disabled
            slug="mongolian"
            name="Mongolian"
          />
          <LanguageLink
            disabled
            slug="nepali"
            name="Nepali"
          />
          <LanguageLink
            disabled
            slug="norwegian-bokmal"
            name="Norwegian Bokmal"
          />
          <LanguageLink
            disabled
            slug="oriya"
            name="Oriya"
          />
          <LanguageLink
            disabled
            slug="oromo"
            name="Oromo"
          />
          <LanguageLink
            disabled
            slug="georgian"
            name="Georgian"
          />
          <LanguageLink
            disabled
            slug="pashto"
            name="Pashto"
          />
          <LanguageLink
            disabled
            slug="polish"
            name="Polish"
          />
          <LanguageLink
            disabled
            slug="sindhi"
            name="Sindhi"
          />
          <LanguageLink
            disabled
            slug="somali"
            name="Somali"
          />
          <LanguageLink
            disabled
            slug="sundanese"
            name="Sundanese"
          />
          <LanguageLink
            disabled
            slug="swedish"
            name="Swedish"
          />
          <LanguageLink
            disabled
            slug="ukrainian"
            name="Ukrainian"
          />
          <LanguageLink
            disabled
            slug="welsh"
            name="Welsh"
          />
          <LanguageLink
            disabled
            slug="yoruba"
            name="Yoruba"
          />
          <LanguageLink
            disabled
            slug="zulu"
            name="Zulu"
          />
        </Grid>

        <div className="flex justify-center p-16 pt-32 pb-64">
          <LinkButton
            href="/languages/modern"
            size="large"
            className="lowercase"
          >
            More Modern Languages
          </LinkButton>
        </div>
      </div>
    </>
  )
}

function LanguageLink({
  className,
  slug,
  name,
  native,
  script,
  color = 'base',
  disabled = false,
}: {
  className?: string
  slug: string
  name: string
  native?: string
  script?: string
  disabled?: boolean
  color?: GridLinkColor
}) {
  if (disabled) {
    return (
      <div
        className={clsx(
          className,
          GRID_LINK_COLORS.box.disabled,
          'shadow-small1 flex flex-col gap-8 text-left p-16 h-full leading-content rounded-sm w-full',
        )}
      >
        <T
          className={clsx(
            GRID_LINK_COLORS.title.disabled,
            'block font-semibold lowercase text-h4 leading-content',
          )}
        >
          {name}
        </T>
        {native && (
          <T
            script={script}
            tag="i"
            className={clsx(
              GRID_LINK_COLORS.description.disabled,
              'block lowercase text-h4 leading-content',
            )}
          >
            {native}
          </T>
        )}
      </div>
    )
  }

  return (
    <NextLink
      href={languagePath({ language: slug })}
      className={clsx(
        className,
        GRID_LINK_COLORS.box[color],
        'shadow-small1 hover:shadow-small2 flex flex-col gap-8 [&>div]:transition-colors transition duration-200 text-left p-16 h-full leading-content rounded-sm w-full',
      )}
    >
      <T
        className={clsx(
          GRID_LINK_COLORS.title[color],
          'block font-semibold lowercase text-h4 leading-content transition-colors',
        )}
      >
        {name}
      </T>
      {native && (
        <T
          script={script}
          className={clsx(
            GRID_LINK_COLORS.description[color],
            'block lowercase text-h4 leading-content transition-colors',
          )}
        >
          {native}
        </T>
      )}
    </NextLink>
  )
}
