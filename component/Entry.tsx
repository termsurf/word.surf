/* eslint-disable simple-import-sort/imports */

import Link from 'next/link'
import React from 'react'

import Grid from '@termsurf/leaf/component/Grid'
import SoundIcon from '@termsurf/leaf/component/icon/Sound'
import Text from '@termsurf/leaf/component/Text'

import cx from 'classnames'

Entry.List = ({ children }) => {
  return <ul className="flex flex-col mb-32 mt-16">{children}</ul>
}

export default function Entry({
  layout = 'list',
  ...rest
}: Item & { layout?: string }) {
  if (layout === 'list') {
    return <EntryListItem {...rest} />
  }
  return <EntryTableItem {...rest} />
}

type Item = {
  native: React.ReactNode
  roman?: React.ReactNode
  definition?: React.ReactNode
  ipa?: React.ReactNode
  role?: React.ReactNode
  note?: React.ReactNode
  sound?: string
  context?: React.ReactNode
  number?: number
  path: string
  nativeClassName?: string
}

function EntryTableItem({
  native,
  roman,
  definition,
  ipa,
  role,
  note,
  sound,
  context,
}: Item) {
  const items: Array<React.ReactNode> = []
  items.push(
    <Text
      key="native"
      className="block leading-base text-4xl text-violet-700 cursor-pointer"
    >
      {native}
    </Text>,
  )
  if (roman) {
    items.push(
      <Text
        key="roman"
        className="block leading-base text-violet-700 font-bold text-xl"
      >
        {roman}
      </Text>,
    )
  }

  if (ipa) {
    items.push(
      <Text
        key="ipa"
        className="block leading-base text-gray-600 text-xl"
      >
        {ipa}
      </Text>,
    )
  }
  return (
    <li className="hover:bg-gray-50 transition-colors flex justify-between gap-16 border-0 border-b-4 border-solid border-gray-100 last:border-b-0 px-16">
      <Grid
        className="flex flex-col gap-16"
        maxColumns={items.length}
        minWidth={256}
        gap={16}
      >
        {items}
      </Grid>
      <div className="flex flex-col gap-16 px-16 py-24">
        <Text className="block leading-base mt-4 text-gray-500">
          {definition}
        </Text>
        {note && (
          <Text className="block leading-base text-gray-400 italic text-lg">
            {note}
          </Text>
        )}
        {context && (
          <Text className="block leading-base text-gray-400 text-xs">
            {context}
          </Text>
        )}
      </div>
      <div className="flex flex-col justify-between items-end gap-16 px-16 py-24">
        <div className="flex flex-col items-end gap-16">
          <Text className="block leading-base text-gray-500 text-xs">
            {role}
          </Text>
          <span className="hover:opacity-70 transition-all cursor-pointer w-32 h-32 inline-block -mr-8">
            <SoundIcon colorClassName="fill-gray-500" />
          </span>
        </div>
      </div>
    </li>
  )
}

function EntryListItem({
  native,
  roman,
  definition,
  ipa,
  role,
  note,
  sound,
  context,
  number,
  path,
  nativeClassName,
}: Item) {
  return (
    <li className="block [&>a]:last:border-b-0">
      <Link
        href={path}
        className="hover:bg-gray-50 transition-colors flex justify-between gap-16 border-0 border-b-4 border-solid border-gray-100"
      >
        <span className="flex flex-col gap-16 px-16 py-24">
          <Text
            className={cx(
              nativeClassName,
              'block leading-base text-lg text-violet-700 cursor-pointer',
            )}
          >
            {native}
          </Text>
          {roman && (
            <Text className="block leading-base text-violet-700 font-bold text-xl">
              {roman}
            </Text>
          )}
          {ipa && (
            <Text className="block leading-base text-gray-600 text-xl">
              {ipa}
            </Text>
          )}
          {definition && (
            <Text className="block leading-base mt-4 text-gray-500">
              {definition}
            </Text>
          )}
          {note && (
            <Text className="block leading-base text-gray-400 italic text-lg">
              {note}
            </Text>
          )}
          {context && (
            <Text className="block leading-base text-gray-400 text-xs">
              {context}
            </Text>
          )}
        </span>
        <span className="flex flex-col justify-between items-end gap-16 px-16 py-24">
          <span className="flex flex-col items-end gap-16">
            {role && (
              <Text className="block leading-base text-gray-500 text-xs">
                {role}
              </Text>
            )}
            {sound && (
              <span className="hover:opacity-70 transition-all cursor-pointer w-32 h-32 inline-block -mr-8">
                <SoundIcon colorClassName="fill-gray-500" />
              </span>
            )}
          </span>
          {number && <Text className="text-gray-400">{number}</Text>}
        </span>
      </Link>
    </li>
  )
}
