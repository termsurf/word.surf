'use client'

import { H1, P } from '@termsurf/leaf/component/Content'
import Grid from '@termsurf/leaf/component/Grid'
import Layout from '@termsurf/leaf/component/Layout'
import Tag from '@termsurf/leaf/component/Tag'
import Environment from '~/lib/frontend/components/Environment'

import useScripts from '@termsurf/leaf/hook/useScripts'
import Link from '../GridLink'

export default function Page() {
  return (
    <Environment>
      <Content />
    </Environment>
  )
}

function Content() {
  useScripts(['code'])

  return (
    <Layout>
      <div className="mt-32 flex flex-col gap-16">
        <header className="mt-64">
          <div className="pb-32 flex justify-center">
            <img
              src="/moon.svg"
              height="192"
              width="192"
            />
          </div>
          <H1>WordSurf</H1>
          <P
            align="center"
            type="secondary"
          >
            Tools for Breaking Down Language
            <span className="text-center block pt-8">
              <Tag
                color="blue"
                className="text-white"
              >
                pre alpha
              </Tag>
            </span>
          </P>
        </header>
        <Grid
          maxColumns={4}
          gap={16}
          minWidth={160}
          className="p-16"
          breakpoints={[4, 2, 1]}
        >
          <Link
            title="Languages"
            href="/languages"
          />
          <Link
            title="Scripts"
            href="/scripts"
          />
          <Link
            title="Symbols"
            href="/symbols"
          />
          <Link
            title="Fonts"
            href="/fonts"
          />
          <Link
            disabled
            title="Guides"
            href="/guides"
          />
          <Link
            disabled
            title="Keyboards"
            href="/keyboards"
          />
          <Link
            disabled
            title="Sounds"
            href="/sounds"
          />
          <Link
            disabled
            title="Games"
            href="/games"
          />
          {/* <Link
          disabled
          title="Resources"
          href="/resources"
        />
        <Link
          disabled
          title="Tools"
          href="/tools"
        />
        <Link
          disabled
          title="Studies"
          href="/studies"
        />
        <Link
          disabled
          title="Stories"
          href="/stories"
        /> */}
        </Grid>
      </div>
    </Layout>
  )
}
