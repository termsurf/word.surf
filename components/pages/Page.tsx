'use client'

import { H1, P } from '@termsurf/leaf/component/Content'
import Environment from '@termsurf/leaf/component/Environment'
import Grid from '@termsurf/leaf/component/Grid'
import Tag from '@termsurf/leaf/component/Tag'

import { languagePath } from '~/tools/paths'

import Link from '../Link'

export default function Page() {
  return (
    <Environment>
      <H1>ChatSurf</H1>
      <P
        align="center"
        type="secondary"
      >
        A Collection of Language Tools for Everyday Use
        <span className="text-center block pt-8">
          <Tag
            color="blue"
            className="text-white"
          >
            pre alpha
          </Tag>
        </span>
      </P>
      <Grid
        maxColumns={3}
        gap={16}
        minWidth={256}
        className="p-16"
      >
        <Link
          title="Tibetan"
          path={languagePath({ language: 'tibetan' })}
        />
        <Link
          title="English"
          path={languagePath({ language: 'english' })}
        />
      </Grid>
    </Environment>
  )
}
