'use client'

import { H1 } from '@termsurf/leaf/component/Content'
import Environment from '@termsurf/leaf/component/Environment'
import Toast from '@termsurf/leaf/component/Toast'
import { FONT, SCRIPT } from '@termsurf/leaf/constant/settings'
import useFonts from '@termsurf/leaf/hook/useFonts'
import { usePageSettings } from '@termsurf/leaf/hook/usePageSettings'
import cx from 'clsx'

import {
  ImageAsset,
  ImageAssetMap,
  Language,
  LanguageItem,
  LanguageListItem,
} from '~/data/types'

import Grid from '@termsurf/leaf/component/Grid'
import Text from '@termsurf/leaf/component/Text'
import Image from 'next/image'
import HeaderContextButton from '~/components/HeaderContextButton'
import { languagePath } from '~/tools/paths'
import { Cached } from './config'

const KEY = '/languages/language/lists/nouns/small'

type PageInput = {
  language: Language
  languages: Array<LanguageItem>
  items: Array<LanguageListItem>
  images: ImageAssetMap
}

export default function Page(props: PageInput) {
  return (
    <Environment settings={{ fonts: FONT, scripts: SCRIPT }}>
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
    <header>
      <HeaderContextButton
        href={languagePath({ language: language.slug })}
      >
        {language.name}
      </HeaderContextButton>
      <H1 className="flex justify-center items-start gap-8">
        <span className="inline-block">Noun List</span>{' '}
        <span className="text-sm relative top-0 text-gray-500 inline-block">
          small
        </span>
      </H1>
    </header>
  )
}

function Body({ language, languages, items, images }: ContentInput) {
  return (
    <>
      <div className="relative w-full pb-128">
        <Grid
          gap={16}
          minWidth={128}
          maxColumns={4}
          breakpoints={[4, 2, 1]}
          className="p-16"
          align="center"
          rowGap={64}
        >
          {Object.keys(images).map(name => {
            const mapping = items.find(item =>
              item.translations[0].components.find(
                component => component.text === name,
              ),
            )
            const translation =
              mapping?.translations[1].components[0]?.text
            return (
              <div
                key={name}
                className="flex justify-center items-center flex-col gap-24"
              >
                <ImageAsset {...images[name]} />
                <Text
                  className={cx(
                    'block',
                    translation ? undefined : 'invisible',
                  )}
                  script="tibetan"
                  size={32}
                >
                  {translation ?? 'placeholder'}
                </Text>
                <Text className="block font-bold text-gray-600">
                  {name}
                </Text>
              </div>
            )
          })}
        </Grid>
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

function ImageAsset(props: ImageAsset) {
  const medium = props.source.files.find(
    file => file.size === 'medium' || !file.size,
  )!
  return (
    <Image
      blurDataURL={props.source.preview}
      alt={props.source.title ?? ''}
      style={{
        borderRadius: 4,
        lineHeight: '1.7',
        // boxShadow: theme.shadows.thick,
        height: 'auto',
        width: '100%',
        fontFamily: 'Noto Sans Mono',
      }}
      width={128}
      height={128}
      src={medium.url}
    />
  )
}
