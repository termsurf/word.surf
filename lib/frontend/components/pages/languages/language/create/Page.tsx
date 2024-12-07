'use client'

import { H1, P } from '@termsurf/leaf/component/Content'
import Layout from '@termsurf/leaf/component/Layout'
import Toast from '@termsurf/leaf/component/Toast'
import { usePageSettings } from '@termsurf/leaf/hook/usePageSettings'
import Environment from '~/lib/frontend/components/Environment'
import { GetLanguageResponse } from '~/lib/shared/queries/languages'

import Grid from '@termsurf/leaf/component/Grid'
import Text from '@termsurf/leaf/component/Text'
import useScripts from '@termsurf/leaf/hook/useScripts'
import Link from 'next/link'
import { useState } from 'react'
import GridLink from '~/lib/frontend/components/GridLink'
import { BoxedHomeIcon } from '~/lib/frontend/components/icons'
import { useGetLanguageQuery } from '~/lib/frontend/queries'

export const CACHED = {}

export type Cached = {
  slug: string
}

export const STORED = {}

export type Stored = {}

export const QUERY = {}

const PATH = '/languages/language/create'

export type PageInput = {
  slug: string
  state: {
    getLanguage: GetLanguageResponse
  }
}

export default function Page({ slug, state }: PageInput) {
  return (
    <Environment
      path={PATH}
      base={STORED}
      cached={{ ...CACHED, slug }}
      queryResolvers={QUERY}
      initializers={state}
    >
      <Content />
    </Environment>
  )
}

function Content() {
  const { cached } = usePageSettings<Stored, Cached>()
  const [layout, setLayout] = useState('right')

  useScripts(['code'])

  const { data, isLoading } = useGetLanguageQuery(cached)

  const language = data?.languages.list.find(
    x => x.slug === cached.slug,
  )

  return (
    <Layout
      onShift={setLayout}
      topLeft={<BoxedHomeIcon />}
      topCenter={
        <div className="flex justify-between items-center p-8 h-40">
          {layout === 'center' ? (
            <BoxedHomeIcon />
          ) : (
            <div className="w-24" />
          )}
          <Link href={`/languages/${language?.slug}`}>
            <Text className="title">{language?.name}</Text>
          </Link>
          <div className="w-24" />
        </div>
      }
    >
      {!isLoading && (
        <div className="flex flex-col mt-32 flex-1">
          <Header />
          <Body />
          <Toast />
        </div>
      )}
    </Layout>
  )
}

function Header() {
  return (
    <header className="mt-64">
      <H1>Editor</H1>
      <P
        align="center"
        type="secondary"
      >
        Flesh Out Your Language
      </P>
    </header>
  )
}

function Body() {
  const { cached, setCached, stored, setStored, isLoaded } =
    usePageSettings<Stored, Cached>()

  return (
    <>
      <div className="relative pb-64 flex flex-col gap-16 p-16">
        <Grid
          minWidth={320}
          maxColumns={2}
          gap={16}
        >
          <GridLink
            className="flex-col text-left"
            title="terms"
            description="Add Some First Words"
            href={`/languages/${cached.slug}/create/terms`}
          />
          <GridLink
            title="guides"
            description="Add an Intro Page"
            href={`/languages/${cached.slug}/create/guides`}
          />
        </Grid>
      </div>
    </>
  )
}
