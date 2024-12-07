'use client'

import Layout from '@termsurf/leaf/component/Layout'
import T from '@termsurf/leaf/component/Text'
import clsx from 'clsx'
import NextLink from 'next/link'
import { useRouter } from 'next/navigation'

import { H1, P } from '@termsurf/leaf/component/Content'
import Grid from '@termsurf/leaf/component/Grid'
import TextInput from '@termsurf/leaf/component/TextInput'
import Toast from '@termsurf/leaf/component/Toast'
import { usePageSettings } from '@termsurf/leaf/hook/usePageSettings'
import Environment from '~/lib/frontend/components/Environment'

import Button from '@termsurf/leaf/component/Button'
import Field from '@termsurf/leaf/component/Field'
import Label from '@termsurf/leaf/component/Label'
import useScripts from '@termsurf/leaf/hook/useScripts'
import kebabCase from 'lodash/kebabCase'
import { MouseEvent, useEffect } from 'react'
import { useCreateLanguageMutation } from '~/lib/frontend/queries/languages'
import { languagePath } from '~/lib/shared/utilities/paths'
import { BoxedHomeIcon } from '../../../icons'

export const CACHED = {}

export type Cached = {
  manuallyChangedPath?: boolean
}

export const STORED = {
  isConstructed: true,
}

export type Stored = {
  isConstructed: boolean
  name?: string
  slug?: string
}

export const QUERY = {}

const PATH = '/languages/create'

export default function Page() {
  return (
    <Environment
      path={PATH}
      base={STORED}
      cached={CACHED}
      queryResolvers={QUERY}
    >
      <Content />
    </Environment>
  )
}

function Content() {
  const { stored } = usePageSettings<Stored, Cached>()
  const router = useRouter()
  const [createLanguage, { isLoading }] = useCreateLanguageMutation()

  const handleNext = async (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    try {
      await createLanguage(stored)
      router.push(`/languages/${stored.slug}/create`)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Layout
      showTopCenterIf={{ left: 'missing' }}
      topCenter={<BoxedHomeIcon />}
      topLeft={<BoxedHomeIcon />}
      bottomCenter={
        <div className="flex justify-center p-8 px-16">
          <Button
            color="purple"
            size="large"
            className="w-full sm:w-256 flex justify-center"
            onClick={handleNext}
            disabled={isLoading}
          >
            Next
          </Button>
        </div>
      }
    >
      <div className="flex flex-col mt-32 flex-1">
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
      <H1>Create Your Language</H1>
      <P
        align="center"
        type="secondary"
      >
        What's it called?
      </P>
    </header>
  )
}

function Body() {
  const { cached, setCached, stored, setStored, isLoaded } =
    usePageSettings<Stored, Cached>()

  useEffect(() => {
    if (!isLoaded) {
      if (!stored.slug && stored.name) {
        setStored({ ...stored, slug: kebabCase(stored.name) })
      }
    }
  }, [stored, isLoaded])

  // if (error) return <p>Error fetching languages</p>

  // const handleChangeConstructed = (isConstructed: boolean) => {
  //   setStored({ ...stored, isConstructed })
  // }

  const handleNameChange = (name?: string) => {
    const updates: Record<string, any> = { name }

    if (!cached.manuallyChangedPath && name) {
      updates.slug = kebabCase(name)
    }

    setStored({ ...stored, ...updates })
  }

  const handlePathChange = (slug?: string) => {
    if (!cached.manuallyChangedPath) {
      setCached({ ...cached, manuallyChangedPath: true })
    }
    setStored({ ...stored, slug })
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

  return (
    <>
      <div className="relative w-full flex-1 flex-shrink-0 pb-64 flex flex-col gap-16 p-16">
        <form className="flex flex-col justify-between flex-1">
          <Grid
            maxColumns={2}
            gap={16}
            minWidth={320}
          >
            <Field>
              <Label>name</Label>
              <TextInput
                size="large"
                placeholder="Your language name ️‍🔥"
                onChange={handleNameChange}
                value={stored.name}
              />
            </Field>
            <Field>
              <Label>slug</Label>
              <TextInput
                size="large"
                onChange={handlePathChange}
                placeholder="language-name"
                value={stored.slug}
              />
            </Field>
            {/* <Field>
              <Label>constructed?</Label>
              <Switch
                checked={stored.isConstructed}
                onChange={handleChangeConstructed}
                size="large"
              />
            </Field> */}
          </Grid>
        </form>
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
