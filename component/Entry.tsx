'use client'

import React from 'react'

import T from '@termsurf/leaf/component/Text'

Entry.List = ({ children }: { children: React.ReactNode }) => {
  return (
    <ul className="shadow-normal mt-16 mb-32 list-none flex flex-col">
      {children}
    </ul>
  )
}

export default function Entry({
  script = 'latin',
  roman,
  native,
  gloss,
}: {
  script?: string
  roman?: string
  native?: React.ReactNode
  gloss: string
}) {
  return (
    <li className="font-medium list-none block even:bg-gray-100 bg-gray-200 first:rounded-t-sm last:rounded-b-sm p-16">
      <div className="flex items-center gap-16">
        {native && <span className="text-h4 font-bold">{native}</span>}{' '}
        {roman && (
          <T className="text-lg font-medium text-gray-600">{roman}</T>
        )}
      </div>
      <div>
        {gloss && (
          <T className="text-base font-medium text-gray-500">{gloss}</T>
        )}
      </div>
    </li>
  )
}
