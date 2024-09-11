/* eslint-disable simple-import-sort/imports */

'use client'

import { type MDXRemoteSerializeResult } from 'next-mdx-remote'
import NextLink from 'next/link'
import { useMemo } from 'react'

import { LinkButton } from '@termsurf/leaf/component/Button'
import { H1, H2, P } from '@termsurf/leaf/component/Content'
import Environment from '@termsurf/leaf/component/Environment'
import Grid from '@termsurf/leaf/component/Grid'
import TriangleLeftIcon from '@termsurf/leaf/component/icon/TriangleLeft'
import TriangleRightIcon from '@termsurf/leaf/component/icon/TriangleRight'
import Text from '@termsurf/leaf/component/Text'
import Toast from '@termsurf/leaf/component/Toast'
import { FONT, SCRIPT } from '@termsurf/leaf/constant/settings'
import useFonts from '@termsurf/leaf/hook/useFonts'
import { usePageSettings } from '@termsurf/leaf/hook/usePageSettings'

import Link from '~/components/Link'
import Guide from '~/components/mdx/Guide'

import { Cached } from './config'

const KEY = '/language/type/guide'

export type GridLink = {
  title: string
  description?: string
  path: string
}

type PageInput = {
  language: {
    title: string
    path: string
  }
  related?: Array<string>
  pages: Array<GridLink>
  scripts?: Array<string>
  source: MDXRemoteSerializeResult
  title: string
  description?: string
  back?: string
  next?: string
}

export default function Page({
  language,
  scripts,
  source,
  title,
  description,
  related,
  pages,
  back,
  next,
}: PageInput) {
  return (
    <Environment settings={{ fonts: FONT, scripts: SCRIPT }}>
      <Content
        back={back}
        next={next}
        related={related}
        pages={pages}
        scripts={scripts}
        language={language}
        source={source}
        title={title}
        description={description}
      />
    </Environment>
  )
}

type ContentInput = PageInput

function Content({
  scripts,
  language,
  source,
  title,
  description,
  related = [],
  pages,
  back,
  next,
}: ContentInput) {
  useFonts(['Tone Etch'])

  return (
    <>
      <Header
        title={title}
        description={description}
        language={language}
      />
      <Body
        related={related}
        pages={pages}
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
  description?: string
  language: {
    title: string
    path: string
  }
}

function Header({ language, title, description }: HeaderInput) {
  const { cached } = usePageSettings<any, Cached>()

  return (
    <header>
      <div className="flex justify-center p-16 pt-0">
        <LinkButton
          href={language.path}
          size="small"
          color="contrast"
          className="rounded-large-circle"
        >
          {language.title}
        </LinkButton>
      </div>
      <H1>{title}</H1>
      {description && (
        <P
          align="center"
          type="secondary"
        >
          {description}
        </P>
      )}
    </header>
  )
}

const TERMS = [{}]

function Body({
  pages,
  related,
  source,
  back,
  next,
}: {
  pages: Array<GridLink>
  related: Array<string>
  source: MDXRemoteSerializeResult
  back?: string
  next?: string
}) {
  const links = useMemo(() => {
    return related
      .map(link => pages.find(page => page.path === link))
      .filter(x => x)
  }, [pages, related])
  const backLink = back && pages.find(page => page.path === back)
  const nextLink = next && pages.find(page => page.path === next)

  return (
    <>
      <div className="relative w-full pb-64">
        <Guide source={source} />

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
        </Grid>
      </div>
    </>
  )
}
