'use client'

import clsx from 'clsx'
import NextLink from 'next/link'

import T from '@termsurf/leaf/component/Text'

import { H1, P } from '@termsurf/leaf/component/Content'
import Grid from '@termsurf/leaf/component/Grid'
import TriangleLeft from '@termsurf/leaf/component/icon/TriangleLeft'
import TriangleRight from '@termsurf/leaf/component/icon/TriangleRight'
import Layout from '@termsurf/leaf/component/Layout'
import TextInput from '@termsurf/leaf/component/TextInput'
import Toast from '@termsurf/leaf/component/Toast'
import {
  QueryResolver,
  usePageSettings,
} from '@termsurf/leaf/hook/usePageSettings'
import useScripts from '@termsurf/leaf/hook/useScripts'
import Environment from '~/lib/frontend/components/Environment'
import { useGetLanguagesQuery } from '~/lib/frontend/queries'
import { GetLanguagesResponse } from '~/lib/shared/queries/languages'
import { languagePath } from '~/lib/shared/utilities/paths'

export const CACHED = {
  page: 1,
  size: 200,
}

export type Cached = {
  page: number
  size: number
}

export const QUERY = {
  page: {
    ...QueryResolver.integer,
    default: 1,
  },
  size: {
    ...QueryResolver.integer,
    default: 200,
  },
  categories: {
    ...QueryResolver.array,
  },
  search: {
    ...QueryResolver.text,
  },
}

const PATH = '/languages/search'

export type GridLink = {
  title: string
  description?: string
  path: string
}

type PageInput = {
  state: GetLanguagesResponse
}

export default function Page({ state }: PageInput) {
  return (
    <Environment
      path={PATH}
      cached={CACHED}
      queryResolvers={QUERY}
      initializers={{ getLanguages: state }}
    >
      <Content />
    </Environment>
  )
}

function Content() {
  useScripts(['code'])

  const { cached } = usePageSettings<any, Cached>()
  const { data } = useGetLanguagesQuery(cached)

  return (
    <Layout bottomCenter={data && <Pagination />}>
      <div className="mt-32">
        <Header />
        <Body />
        <Toast />
      </div>
    </Layout>
  )
}

function Pagination() {
  const { cached, setCached } = usePageSettings<any, Cached>()
  const { data } = useGetLanguagesQuery(cached)

  const handleLeft = () => {
    setCached({
      ...cached,
      page: cached.page === 1 ? cached.page : cached.page - 1,
    })
  }

  const handleRight = () => {
    setCached({
      ...cached,
      page:
        cached.page === data!.languages.size - 1
          ? cached.page
          : cached.page + 1,
    })
  }

  return (
    <div className="flex w-full justify-between items-center">
      <div
        className="w-40 h-40 p-8 cursor-pointer"
        onClick={handleLeft}
      >
        <TriangleLeft hoverable />
      </div>
      <div
        className="w-40 h-40 p-8 cursor-pointer"
        onClick={handleRight}
      >
        <TriangleRight hoverable />
      </div>
    </div>
  )
}

function Header() {
  return (
    <header className="mt-64">
      <H1 className="block uppercase scale-y-80 tracking-wide-015 !mb-0">
        Search Languages
      </H1>
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
  const { cached, setCached } = usePageSettings<any, Cached>()

  const { data, /*error,*/ isLoading } = useGetLanguagesQuery(cached)

  // if (error) return <p>Error fetching languages</p>

  useScripts(['code'])

  if (isLoading) {
    return
  }

  return (
    <>
      <div className="relative w-full pb-64 flex flex-col gap-16 p-16">
        <TextInput
          size="large"
          placeholder="Search by name..."
        />

        <Grid
          minWidth={264}
          gap={16}
          maxColumns={3}
        >
          {data?.languages.list.map(language => (
            <LanguageLink
              disabled
              key={language.id}
              name={language.name}
              slug={language.slug}
            />
          ))}
        </Grid>
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
  disabled = false,
}: {
  className?: string
  slug: string
  name: string
  native?: string
  script?: string
  disabled?: boolean
}) {
  if (disabled) {
    return (
      <div
        className={clsx(
          className,
          'shadow-small1 flex flex-col gap-8 bg-zinc-100 text-left p-16 h-full leading-content rounded-sm w-full',
        )}
      >
        <T className="block font-semibold lowercase text-h4 leading-content text-zinc-300">
          {name}
        </T>
        {native && (
          <T
            script={script}
            tag="i"
            className="block lowercase text-h4 leading-content text-zinc-300"
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
        'shadow-small1 hover:shadow-small2 flex flex-col gap-8 bg-zinc-50 [&>div]:hover:text-violet-600 [&>div]:transition-colors transition-all duration-200 text-left p-16 h-full leading-content rounded-sm w-full [&_span]:hover:text-violet-600 [&_i]:hover:text-violet-400',
      )}
    >
      <T className="block font-semibold lowercase text-h4 leading-content transition-colors">
        {name}
      </T>
      {native && (
        <T
          script={script}
          tag="i"
          className="block lowercase text-h4 leading-content text-zinc-400 transition-colors"
        >
          {native}
        </T>
      )}
    </NextLink>
  )
}
