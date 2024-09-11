import React from 'react'
import NextLink from 'next/link'

import T from '@termsurf/leaf/component/Text'

function Link({
  path,
  title,
  description,
}: {
  path: string
  title: string
  description?: string
}) {
  return (
    <NextLink
      href={path}
      className="shadow-xl flex flex-col gap-8 bg-gray-100 hover:bg-gray-50 hover:shadow-medium transition-all duration-200 text-left p-16 h-full leading-content rounded-sm w-full"
    >
      <T className="block font-bold text-h4 leading-content">{title}</T>
      {description && (
        <T className="block leading-content">{description}</T>
      )}
    </NextLink>
  )
}

export default Link
