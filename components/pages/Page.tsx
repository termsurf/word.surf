'use client'

import { H1, P } from '@termsurf/leaf/component/Content'
import Environment from '@termsurf/leaf/component/Environment'
import Grid from '@termsurf/leaf/component/Grid'
import Tag from '@termsurf/leaf/component/Tag'

import Link from '../Link'

export default function Page() {
  return (
    <Environment>
      <H1 className="uppercase scale-y-80 !mb-0">ChatSurf</H1>
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
        maxColumns={4}
        gap={16}
        minWidth={192}
        className="p-16"
        breakpoints={[4, 2, 1]}
      >
        <Link
          title="Languages"
          path="/languages"
        />
        <Link
          title="Scripts"
          path="/scripts"
        />
        <Link
          disabled
          title="Symbols"
          path="/symbols"
        />
        <Link
          disabled
          title="Guides"
          path="/guides"
        />
        <Link
          disabled
          title="Keyboards"
          path="/keyboards"
        />
        <Link
          title="Fonts"
          path="/fonts"
        />
        <Link
          disabled
          title="Sounds"
          path="/sounds"
        />
        <Link
          disabled
          title="Games"
          path="/games"
        />
        {/* <Link
          disabled
          title="Resources"
          path="/resources"
        />
        <Link
          disabled
          title="Tools"
          path="/tools"
        />
        <Link
          disabled
          title="Studies"
          path="/studies"
        />
        <Link
          disabled
          title="Stories"
          path="/stories"
        /> */}
      </Grid>
    </Environment>
  )
}
