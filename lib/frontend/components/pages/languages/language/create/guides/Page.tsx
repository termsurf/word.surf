'use client'

import clsx from 'clsx'
import { useRouter } from 'next/navigation'

import T from '@termsurf/leaf/component/Text'

import { H1, H2, P } from '@termsurf/leaf/component/Content'
import Grid from '@termsurf/leaf/component/Grid'
import Layout from '@termsurf/leaf/component/Layout'
import TextInput from '@termsurf/leaf/component/TextInput'
import Toast from '@termsurf/leaf/component/Toast'
import CloseIcon from '@termsurf/leaf/component/icon/Close'
import { usePageSettings } from '@termsurf/leaf/hook/usePageSettings'
import Environment from '~/lib/frontend/components/Environment'

import Button from '@termsurf/leaf/component/Button'
import Field from '@termsurf/leaf/component/Field'
import Label from '@termsurf/leaf/component/Label'
import Tag from '@termsurf/leaf/component/Tag'
import TextEditor from '@termsurf/leaf/component/TextEditor'
import useScripts from '@termsurf/leaf/hook/useScripts'
import kebabCase from 'lodash/kebabCase'
import Link from 'next/link'
import { MouseEvent, useEffect } from 'react'
import { BoxedHomeIcon } from '~/lib/frontend/components/icons'
import { useGetLanguageQuery } from '~/lib/frontend/queries'

export const CACHED = {}

export type Cached = {
  manuallyChangedPath?: boolean
  slug: string
}

export const STORED = {}

export type Stored = {
  title?: string
  path?: string
  content?: string
}

export const QUERY = {}

const PATH = '/languages/language/create/guides'

export default function Page({ slug }: { slug: string }) {
  return (
    <Environment
      path={PATH}
      base={STORED}
      cached={{ ...CACHED, slug }}
      queryResolvers={QUERY}
    >
      <Content />
    </Environment>
  )
}

function Content() {
  const { cached, setCached, stored, setStored, isLoaded } =
    usePageSettings<Stored, Cached>()
  useScripts(['code'])

  const { data, /*error,*/ isLoading } = useGetLanguageQuery(cached)

  const language = data?.languages.list.find(
    x => x.slug === cached.slug,
  )

  const handleNext = async (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    try {
      // await createLanguage(stored)
      // router.push(`/languages/${stored.slug}/create`)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Layout
      topLeft={<BoxedHomeIcon />}
      topCenter={
        <div className="flex justify-center items-center p-8 h-40">
          <Link href={`/languages/${language?.slug}`}>
            <T className="title">{language?.name}</T>
          </Link>
        </div>
      }
      bottomCenter={
        <div className="flex justify-center px-16 p-8">
          <Button
            color="purple"
            size="large"
            onClick={handleNext}
            disabled={isLoading}
          >
            Next
          </Button>
        </div>
      }
    >
      <div className="flex flex-col mt-32 mb-64 flex-1">
        <Header />
        <Body />
        <Toast />
      </div>
    </Layout>
  )
}

function Header() {
  return (
    <header className="mt-64">
      <H1>
        Guides{' '}
        <Tag
          color="blue"
          className="!absolute top-0"
        >
          Editing
        </Tag>
      </H1>
      <P
        align="center"
        type="secondary"
      >
        Write the language book
      </P>
    </header>
  )
}

function Body() {
  const { cached, setCached, stored, setStored, isLoaded } =
    usePageSettings<Stored, Cached>()
  const router = useRouter()

  const { data, /*error,*/ isLoading } = useGetLanguageQuery(cached)

  useEffect(() => {
    if (!isLoaded) {
      if (!stored.path && stored.title) {
        setStored({ ...stored, path: kebabCase(stored.title) })
      }
    }
  }, [stored, isLoaded])

  const handleTitleChange = (title?: string) => {
    const updates: Record<string, any> = { title }

    if (!cached.manuallyChangedPath && title) {
      updates.path = kebabCase(title)
    }

    setStored({ ...stored, ...updates })
  }

  const handleContentChange = (content?: string) => {
    const updates: Record<string, any> = { content }

    setStored({ ...stored, ...updates })
  }

  const handlePathChange = (path?: string) => {
    if (!cached.manuallyChangedPath) {
      setCached({ ...cached, manuallyChangedPath: true })
    }
    setStored({ ...stored, path })
  }

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

  if (isLoading) {
    return
  }

  return (
    <>
      <div className="relative w-full flex-1 flex-shrink-0 pb-64 flex flex-col gap-16">
        <form className="flex flex-col gap-16 justify-between flex-1">
          <div className="px-16">
            <Grid
              maxColumns={2}
              gap={16}
              minWidth={320}
            >
              <Field>
                <Label>title</Label>
                <TextInput
                  size="large"
                  placeholder="Guide title"
                  onChange={handleTitleChange}
                  value={stored.title}
                />
              </Field>
              <Field>
                <Label disabled>path</Label>
                <TextInput
                  size="large"
                  disabled
                  onChange={handlePathChange}
                  // before={<T>/</T>}
                  value={stored.path}
                />
              </Field>
            </Grid>
            <Field className="w-full">
              <Label className="text-zinc-400">content</Label>
              <TextEditor
                value={stored.content}
                height="100%"
                onChange={handleContentChange}
                className="relative h-512"
                language="javascript"
              />
            </Field>
          </div>
          <H2>Images</H2>
          <div className="px-16">
            <Grid
              maxColumns={3}
              gap={16}
              minWidth={256}
            >
              <Image
                slug="bear"
                id="kajcdocjaiocjcai"
              />
              <Image
                slug="bear"
                id="kajcdocjaiocjcai"
              />
              <Image
                slug="bear"
                id="kajcdocjaiocjcai"
              />
              <Image
                slug="bear"
                id="kajcdocjaiocjcai"
              />
            </Grid>
          </div>
          <H2>Videos</H2>
          <div className="px-16">
            <Grid
              maxColumns={3}
              gap={16}
              minWidth={256}
            >
              <Video
                slug="bear"
                id="kajcdocjaiocjcai"
              />
              <Video
                slug="bear"
                id="kajcdocjaiocjcai"
              />
              <Video
                slug="bear"
                id="kajcdocjaiocjcai"
              />
              <Video
                slug="bear"
                id="kajcdocjaiocjcai"
              />
            </Grid>
          </div>
          <H2>Audios</H2>
          <div className="px-16">
            <Grid
              maxColumns={3}
              gap={16}
              minWidth={256}
            >
              <Audio
                slug="bear"
                id="kajcdocjaiocjcai"
              />
              <Audio
                slug="bear"
                id="kajcdocjaiocjcai"
              />
              <Audio
                slug="bear"
                id="kajcdocjaiocjcai"
              />
              <Audio
                slug="bear"
                id="kajcdocjaiocjcai"
              />
            </Grid>
          </div>
          <H2>Fonts</H2>
          <div className="px-16">
            <Grid
              maxColumns={3}
              gap={16}
              minWidth={256}
            >
              <Font
                slug="bear"
                id="kajcdocjaiocjcai"
              />
              <Font
                slug="bear"
                id="kajcdocjaiocjcai"
              />
              <Font
                slug="bear"
                id="kajcdocjaiocjcai"
              />
              <Font
                slug="bear"
                id="kajcdocjaiocjcai"
              />
            </Grid>
          </div>
        </form>
      </div>
    </>
  )
}

function Image({ slug, id }: { slug: string; id: string }) {
  return (
    <div
      className={clsx(
        'shadow-small1 rounded-sm flex p-8 gap-8 bg-zinc-200',
      )}
    >
      <div className="flex flex-col gap-8">
        <Field>
          <TextInput value={slug} />
        </Field>

        <Field>
          <TextInput
            value={id}
            className="!text-zinc-500"
          />
        </Field>
      </div>
      <div className="preview bg-zinc-100 rounded-sm w-64 min-w-64 flex-1 flex justify-center items-center [&_i]:hover:opacity-70">
        <i className="p-2 w-28 h-28 bg-white rounded-sm opacity-0 transition-opacity absolute -right-8 -top-8 cursor-pointer [&_path]:hover:fill-rose-600">
          <CloseIcon colorClassName="fill-rose-400 transition-all" />
        </i>
      </div>
    </div>
  )
}

function Audio({ slug, id }: { slug: string; id: string }) {
  return (
    <div
      className={clsx(
        'shadow-small1 rounded-sm flex p-8 gap-8 bg-zinc-200',
      )}
    >
      <div className="flex flex-col gap-8">
        <Field>
          <TextInput value={slug} />
        </Field>

        <Field>
          <TextInput
            value={id}
            className="!text-zinc-500"
          />
        </Field>
      </div>
      <div className="preview bg-zinc-100 rounded-sm w-64 min-w-64 flex-1 flex justify-center items-center [&_i]:hover:opacity-70 cursor-pointer">
        <i className="w-24 h-24 opacity-0 transition-opacity">
          <CloseIcon />
        </i>
      </div>
    </div>
  )
}

function Video({ slug, id }: { slug: string; id: string }) {
  return (
    <div
      className={clsx(
        'shadow-small1 rounded-sm flex p-8 gap-8 bg-zinc-200',
      )}
    >
      <div className="flex flex-col gap-8">
        <Field>
          <TextInput value={slug} />
        </Field>

        <Field>
          <TextInput
            value={id}
            className="!text-zinc-500"
          />
        </Field>
      </div>
      <div className="preview bg-zinc-100 rounded-sm w-64 min-w-64 flex-1 flex justify-center items-center [&_i]:hover:opacity-70 cursor-pointer">
        <i className="w-24 h-24 opacity-0 transition-opacity">
          <CloseIcon />
        </i>
      </div>
    </div>
  )
}

function Font({ slug, id }: { slug: string; id: string }) {
  return (
    <div
      className={clsx(
        'shadow-small1 rounded-sm flex p-8 gap-8 bg-zinc-200',
      )}
    >
      <div className="flex flex-col gap-8">
        <Field>
          <TextInput value={slug} />
        </Field>

        <Field>
          <TextInput
            value={id}
            className="!text-zinc-500"
          />
        </Field>
      </div>
      <div className="preview bg-zinc-100 rounded-sm w-64 min-w-64 flex-1 flex justify-center items-center [&_i]:hover:opacity-70 cursor-pointer">
        <i className="w-24 h-24 opacity-0 transition-opacity">
          <CloseIcon />
        </i>
      </div>
    </div>
  )
}
