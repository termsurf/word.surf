/* eslint-disable simple-import-sort/imports */

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
import Link from 'next/link'
import { useState } from 'react'
import HeaderContextButton from '~/components/HeaderContextButton'
import {
  languageComponentPath,
  languageListPath,
  languagePath,
  slugify,
} from '~/tools/paths'
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
    <header>
      <HeaderContextButton
        href={languagePath({ language: language.slug })}
      >
        {language.name}
      </HeaderContextButton>
      <H1 className="flex justify-center items-start gap-8 !mb-24">
        <span className="inline-block">Noun List</span>{' '}
        <span className="text-sm relative top-0 text-gray-500 inline-block">
          small
        </span>
      </H1>
      <ul className="flex gap-8 justify-center mb-32">
        <li>
          <Link
            href={languageListPath({
              language: language.slug,
              path: 'noun/small',
            })}
          >
            <Text className="font-bold">S</Text>
          </Link>
        </li>
        <li>
          <Link
            className="[&>span]:hover:text-violet-600 [&>span]:transition-colors"
            href={languageListPath({
              language: language.slug,
              path: 'noun/medium',
            })}
          >
            <Text className="font-bold text-gray-400">M</Text>
          </Link>
        </li>
        <li>
          <Link
            className="[&>span]:hover:text-violet-600 [&>span]:transition-colors"
            href={languageListPath({
              language: language.slug,
              path: 'noun/large',
            })}
          >
            <Text className="font-bold text-gray-400">L</Text>
          </Link>
        </li>
      </ul>
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
              mapping?.translations[1]?.components[0]?.text

            const Component = translation ? Link : 'div'
            const props = translation
              ? {
                  href: languageComponentPath({
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
                  script="tibetan"
                  size={32}
                >
                  {translation ?? 'placeholder'}
                </Text>
                <Text className="transition-colors block font-bold text-gray-600">
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
