import Page, { GridLink } from '~/page/language/type/guide/Page'

import React from 'react'
import fsp from 'fs/promises'
import { serialize } from 'next-mdx-remote/serialize'
import { compileMDX } from 'next-mdx-remote/rsc'
import gfm from 'remark-gfm'
import math from 'remark-math'
import katex from 'rehype-katex'

import { buildMetadata } from '@termsurf/leaf/utility/metadata'
import YAML from 'js-yaml'
import path from 'path'

type Input = {
  params: { language: string }
}

export const generateMetadata = async ({ params }: Input) => {
  const content = await fsp.readFile(
    path.resolve(`./content/language/${params.language}/index.mdx`),
    'utf-8',
  )
  const { frontmatter } = await compileMDX<{
    title: string
    description?: string
  }>({
    source: content,
    options: { parseFrontmatter: true },
  })

  return buildMetadata('ChatSurf', {
    title: frontmatter.title,
    description: frontmatter.description,
  })
}

export default async function View({ params }: Input) {
  const content = await fsp.readFile(
    path.resolve(`./content/language/${params.language}/index.mdx`),
    'utf-8',
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
  const pages = YAML.load(
    await fsp.readFile(
      path.resolve(`./content/language/${params.language}/pages.yaml`),
      `utf-8`,
    ),
  )

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