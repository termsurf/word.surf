/* eslint-disable simple-import-sort/imports */

'use client'

import { type MDXRemoteSerializeResult } from 'next-mdx-remote'

import { H1, P } from '@termsurf/leaf/component/Content'
import Toast from '@termsurf/leaf/component/Toast'
import useFonts from '@termsurf/leaf/hook/useFonts'
import { usePageSettings } from '@termsurf/leaf/hook/usePageSettings'
import Environment from '~/lib/frontend/components/Environment'

import Guide from '~/lib/frontend/components/mdx/Guide'

import Text from '@termsurf/leaf/component/Text'
import useScripts from '@termsurf/leaf/hook/useScripts'
import Link from 'next/link'

export const CACHED = {}

export type Cached = {}

const KEY = '/languages/language/guide'

export type GridLink = {
  title: string
  subtitle?: string
  path: string
}

type PageInput = {
  language: {
    name: string
    slug: string
  }
  related?: Array<string>
  scripts?: Array<string>
  source: MDXRemoteSerializeResult
  title: string
  subtitle?: string
  back?: string
  next?: string
}

export default function Page({
  language,
  scripts,
  source,
  title,
  subtitle,
  related,
  back,
  next,
}: PageInput) {
  return (
    <Environment>
      <Content
        back={back}
        next={next}
        related={related}
        scripts={scripts}
        language={language}
        source={source}
        title={title}
        subtitle={subtitle}
      />
    </Environment>
  )
}

type ContentInput = PageInput

function Content({
  scripts = [],
  language,
  source,
  title,
  subtitle,
  related = [],
  back,
  next,
}: ContentInput) {
  useFonts(['Tone Etch'])
  useScripts(scripts)

  return (
    <>
      <Header
        title={title}
        subtitle={subtitle}
        language={language}
      />
      <Body
        related={related}
        source={source}
        back={back}
        next={next}
      />
      <Toast />
    </>
  )
}

type HeaderInput = {
  title: string
  subtitle?: string
  language: {
    name: string
    slug: string
  }
}

function Header({ language, title, subtitle }: HeaderInput) {
  const { cached } = usePageSettings<any, Cached>()

  return (
    <header className="mt-64 text-center">
      <Link
        href="/languages"
        className="block lowercase text-sm hover:text-violet-600 transition-colors"
      >
        <Text>{language.name}</Text>
      </Link>
      <H1 className="block uppercase scale-y-[0.8] tracking-wide-015">
        {title}
      </H1>
      {subtitle && (
        <P
          align="center"
          type="secondary"
        >
          {subtitle}
        </P>
      )}
    </header>
  )
}

function Body({
  related,
  source,
  back,
  next,
}: {
  related: Array<string>
  source: MDXRemoteSerializeResult
  back?: string
  next?: string
}) {
  // const links = useMemo(() => {
  //   return related
  //     .map(link => pages.find(page => page.path === link))
  //     .filter(x => x)
  // }, [pages, related])
  // const backLink = back && pages.find(page => page.path === back)
  // const nextLink = next && pages.find(page => page.path === next)

  return (
    <>
      <div className="relative w-full pb-64">
        <Guide source={source} />
        {/*
        {Boolean(links.length) && (
          <>
            <H2>Related Links</H2>
            <Grid
              maxColumns={2}
              minWidth={144}
              gap={16}
              className="p-16"
            >
              {links.map(
                (link, i) =>
                  link && (
                    <Link
                      key={`${link.path}-${i}`}
                      {...link}
                    />
                  ),
              )}
            </Grid>
          </>
        )}

        <Grid
          minWidth={144}
          gap={16}
          maxColumns={2}
          className="p-16"
        >
          {backLink ? (
            <NextLink
              href={backLink.path}
              className="flex gap-16 flex-1 items-center"
            >
              <span className="w-24 h-24">
                <TriangleLeftIcon />
              </span>
              <Text>{backLink.title}</Text>
            </NextLink>
          ) : (
            <div />
          )}
          {nextLink ? (
            <NextLink
              href={nextLink.path}
              className="flex justify-end gap-16 flex-1 items-center"
            >
              <Text>{nextLink.title}</Text>
              <span className="w-24 h-24">
                <TriangleRightIcon />
              </span>
            </NextLink>
          ) : (
            <div />
          )}
        </Grid> */}
      </div>
    </>
  )
}
