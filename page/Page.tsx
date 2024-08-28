'use client'

import React from 'react'
import Tag from '@termsurf/leaf/component/Tag'
import Environment from '@termsurf/leaf/component/Environment'
import { H1, P } from '@termsurf/leaf/component/Content'

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
    </Environment>
  )
}
