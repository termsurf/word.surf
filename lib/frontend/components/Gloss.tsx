'use client'

import React from 'react'

import T from '@termsurf/leaf/component/Text'

Gloss.List = ({ children }: { children: React.ReactNode }) => {
  return (
    <ul className="shadow-normal mt-16 mb-32 list-none flex flex-col">
      {children}
    </ul>
  )
}

export default function Gloss({
  script = 'latin',
  original,
  native,
  literal,
  english,
}: {
  script?: string
  original: string
  native?: string
  literal?: string
  english: string
}) {
  return (
    <li className="font-medium list-none block even:bg-zinc-100 bg-zinc-200 p-16">
      {native && (
        <T
          tag="div"
          className="font-bold text-lg"
        >
          {native}
        </T>
      )}
      <T
        tag="div"
        className="font-bold text-lg"
      >
        {original}
      </T>
      {literal && (
        <T
          tag="div"
          className="text-base"
        >
          {literal}
        </T>
      )}
      <T
        tag="div"
        className="text-base text-zinc-600 italic"
      >
        {english}
      </T>
    </li>
  )
}
