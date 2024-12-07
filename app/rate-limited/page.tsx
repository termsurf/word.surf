'use client'

import Environment from '~/lib/frontend/components/Environment'

import { Button } from '@termsurf/leaf/component/Button'
import { H1, P } from '@termsurf/leaf/component/Content'
import Layout from '@termsurf/leaf/component/Layout'
import useScripts from '@termsurf/leaf/hook/useScripts'
import sample from 'lodash/sample'
import list from './list.yaml'

export default function RateLimited() {
  return (
    <Environment>
      <Layout
        left={<div className="h-full w-full bg-blue-300" />}
        right={<div className="h-full w-full bg-blue-300" />}
      >
        <Content />
      </Layout>
    </Environment>
  )
}

function Content() {
  useScripts(['code'])

  const item = sample(list)

  return (
    <div className="relative mt-64">
      <H1 className="font-bold text-center uppercase scale-y-80 tracking-wide-015">
        {item.title}
      </H1>
      <P>{item.message}</P>
      <div className="flex justify-center">
        <Button onClick={() => window.location.reload()}>
          Try again
        </Button>
      </div>
    </div>
  )
}
