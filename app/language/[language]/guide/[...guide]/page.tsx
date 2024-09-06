import React from 'react'
import { compileMDX } from 'next-mdx-remote/rsc'
import { serialize } from 'next-mdx-remote/serialize'
import fsp from 'fs/promises'
import YAML from 'js-yaml'
import path from 'path'
import katex from 'rehype-katex'
import gfm from 'remark-gfm'
import math from 'remark-math'

import { buildMetadata } from '@termsurf/leaf/utility/metadata'

import Page, { GridLink } from '~/page/language/type/guide/Page'

type Input = {
  params: { language: string; guide: Array<string> }
}

export const generateMetadata = async ({ params }: Input) => {
  const content = await fsp.readFile(
    path.resolve(
      `./content/language/${params.language}/${params.guide.join(
        '/',
      )}.mdx`,
    ),
    'utf-8',
  )
  const { frontmatter } = await compileMDX<{
    title: string
    description?: string
    media?: {
      title?: string
      description?: string
    }
  }>({
    source: content,
    options: { parseFrontmatter: true },
  })

  return buildMetadata('ChatSurf', {
    title: frontmatter.media?.title || frontmatter.title,
    description:
      frontmatter.media?.description || frontmatter.description,
  })
}

export default async function View({ params }: Input) {
  const content = await fsp.readFile(
    path.resolve(
      `./content/language/${params.language}/${params.guide.join(
        '/',
      )}.mdx`,
    ),
    'utf-8',
  )
  const pages = YAML.load(
    await fsp.readFile(
      path.resolve(`./content/language/${params.language}/pages.yaml`),
      `utf-8`,
    ),
  )
  const { frontmatter } = await compileMDX<{
    title: string
    description?: string
    language: {
      title: string
      path: string
    }
    scripts?: Array<string>
    back?: string
    next?: string
    related?: Array<string>
  }>({
    source: content,
    options: { parseFrontmatter: true },
  })

  const source = await serialize(
    content.replace(/^---\s*([\s\S]*?)\s*---/, ''),
    {
      mdxOptions: {
        remarkPlugins: [gfm, math],
        rehypePlugins: [katex],
      },
    },
  )

  return (
    <Page
      source={source}
      {...params}
      {...frontmatter}
      pages={pages as Array<GridLink>}
    />
  )
}
