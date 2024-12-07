/* eslint-disable simple-import-sort/imports */

'use client'

import Toast from '@termsurf/leaf/component/Toast'
import useFonts from '@termsurf/leaf/hook/useFonts'
import { usePageSettings } from '@termsurf/leaf/hook/usePageSettings'
import cx from 'clsx'
import Environment from '~/lib/frontend/components/Environment'

import {
  ImageAsset,
  ImageAssetMap,
  Language,
  LanguageItem,
  LanguageListItem,
} from '~/lib/shared/constants'

import { H1 } from '@termsurf/leaf/component/Content'
import Grid from '@termsurf/leaf/component/Grid'
import Text from '@termsurf/leaf/component/Text'
import useScripts from '@termsurf/leaf/hook/useScripts'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import NVA from '~/lib/frontend/components/NVA'
import SML from '~/lib/frontend/components/SML'
import {
  languageStringPath,
  slugify,
} from '~/lib/shared/utilities/paths'

export const CACHED = {}

export type Cached = {}

const KEY = '/languages/language/lists/nouns/small'

type PageInput = {
  language: Language
  languages: Array<LanguageItem>
  items: Array<LanguageListItem>
  images: ImageAssetMap
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
  useScripts(['tibetan', 'hebrew'])

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
      <H1 className="flex flex-col !mb-16">
        <span className="block uppercase scale-y-[0.8] tracking-wide-015">
          {language.name}
        </span>
        <span className="block lowercase text-sm text-zinc-400">
          Nouns
        </span>
        <SML
          type="nouns"
          active="small"
          language={language}
        />
      </H1>
    </header>
  )
}

function Body({ language, languages, items, images }: ContentInput) {
  return (
    <>
      <div className="relative w-full pb-128 flex flex-col gap-16">
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
              mapping?.translations[1]?.components[0]?.text

            const Component = translation ? Link : 'div'
            const props = translation
              ? {
                  href: languageStringPath({
                    language: language.slug,
                    component: slugify(translation),
                  }),
                }
              : { href: '' }
            return (
              <Component
                key={name}
                className={cx(
                  'flex justify-center items-center flex-col gap-24',
                  translation
                    ? '[&>span]:hover:text-violet-600 [&>span]:transition-colors'
                    : undefined,
                )}
                {...props}
              >
                <ImageAssetLoader {...images[name]} />
                <Text
                  className={cx(
                    'block transition-colors',
                    translation ? undefined : 'invisible',
                  )}
                  script="hebrew"
                  size={32}
                >
                  {translation ?? 'placeholder'}
                </Text>
                <Text className="transition-colors block font-bold text-zinc-600">
                  {name}
                </Text>
              </Component>
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
        <NVA
          className="mt-64"
          language={language}
          size="small"
          active="noun/small"
        />
      </div>
    </>
  )
}

function ImageAssetLoader(props: ImageAsset) {
  const medium = props.source.files.find(
    file => file.size === 'medium' || !file.size,
  )!
  const [isLoaded, setIsLoaded] = useState(false)
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
        transition: 'opacity 0.3s',
        opacity: isLoaded ? 1 : 0,
      }}
      width={128}
      height={128}
      src={medium.url}
      onLoadingComplete={() => setIsLoaded(true)}
    />
  )
}
