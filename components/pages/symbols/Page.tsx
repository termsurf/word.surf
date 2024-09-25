'use client'

import AutoSizer from '@lancejpollard/react-virtualized/dist/commonjs/AutoSizer'
import List from '@lancejpollard/react-virtualized/dist/commonjs/List'
import clsx from 'clsx'
import chunk from 'lodash/chunk'
import { useResizeObserver } from 'usehooks-ts'
import ranges from './ranges.json'

import { H1 } from '@termsurf/leaf/component/Content'
import Environment from '@termsurf/leaf/component/Environment'
import TextInput from '@termsurf/leaf/component/TextInput'
import Toast from '@termsurf/leaf/component/Toast'
import { FONT, SCRIPT } from '@termsurf/leaf/constant/settings'
import useFonts from '@termsurf/leaf/hook/useFonts'
import { usePageSettings } from '@termsurf/leaf/hook/usePageSettings'

import { LinkButton } from '@termsurf/leaf/component/Button'
import Text from '@termsurf/leaf/component/Text'
import Link from 'next/link'
import React, {
  CSSProperties,
  ReactNode,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { Cached } from './config'

const KEY = '/languages'

export type GridLink = {
  title: string
  description?: string
  path: string
}

type PageInput = {}

export default function Page() {
  return (
    <Environment settings={{ fonts: FONT, scripts: SCRIPT }}>
      <Content />
    </Environment>
  )
}

type ContentInput = PageInput

function Content() {
  useFonts(['Tone Etch'])

  return (
    <>
      <Header />
      <Body />
      <Toast />
    </>
  )
}

function Header() {
  const { cached } = usePageSettings<any, Cached>()

  return (
    <header>
      <H1 className="block uppercase scale-y-80 tracking-wide-015">
        Symbols
      </H1>
    </header>
  )
}

function Body() {
  const glyphs: Array<any> = []
  const fonts = {}
  for (const range of ranges) {
    let i = range.start
    let n = range.end
    while (i <= n) {
      const slug = getSlug(i, range.status)
      const glyph = getGlyph(i, range.status)
      range.font?.split(/\s*,\s*/).forEach(font => (fonts[font] = true))
      glyphs.push({ slug, glyph, font: range.font })
      i++
    }
  }

  useFonts(Object.keys(fonts))

  return (
    <>
      <div className="relative w-full pb-64 flex flex-col gap-16 p-16">
        <TextInput size="large" />

        {/* <H2 className="!text-2xl !mb-0 !text-gray-600 !border-0 text-center uppercase scale-y-80 tracking-wide-015">
          Ancient
        </H2> */}
        <VirtualizedGrid
          minWidth={40}
          gap={2}
          maxColumns={16}
          breakpoints={[16, 8]}
          records={glyphs}
          render={Glyph}
        />

        <div className="flex justify-center p-16 pt-32 pb-64">
          <LinkButton
            href="/scripts/ancient"
            size="large"
            className="lowercase"
          >
            More Ancient Scripts
          </LinkButton>
        </div>
      </div>
    </>
  )
}

function Glyph({
  glyph,
  slug,
  font,
}: {
  glyph?: string | undefined
  slug?: string | undefined
  font?: string
}) {
  if (!slug) {
    return (
      <div className="mb-2 rounded-sm bg-gray-200 h-46 flex text-xl justify-center items-center p-4">
        {' '}
      </div>
    )
  }

  if (!glyph) {
    return (
      <div className="mb-2 rounded-sm bg-gray-50 h-46 flex text-xl justify-center items-center p-4">
        {' '}
      </div>
    )
  }

  const fontStyle = font ? font.split(/\s*,\s*/) : font

  console.log(font, fontStyle)

  return (
    <Link
      href={`/symbols/${slug}`}
      className="overflow-hidden mb-2 rounded-sm bg-gray-50 h-46 flex text-xl justify-center items-center p-4 hover:text-violet-600 transition-colors hover:bg-gray-100"
    >
      <Text font={fontStyle}>{glyph}</Text>
    </Link>
  )
}

type GridInput = {
  className?: string
  rowClassName?: string
  maxColumns: number
  minWidth: number
  maxWidth?: number
  maxRows?: number
  gap: number
  rowGap?: number
  records: Array<any>
  align?: 'left'
  breakpoints?: Array<number>
  stretchLast?: boolean
  render: any
}
function VirtualizedGrid({
  className,
  rowClassName,
  maxColumns,
  minWidth,
  gap,
  records,
  render,
  rowGap,
  align = 'left',
  breakpoints = [],
}: GridInput) {
  // const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null)
  const [itemWidth, setItemWidth] = useState(0)
  const [rows, setRows] = useState<Array<Array<ReactNode>>>([])
  const { width: containerWidth = 1 } = useResizeObserver({
    ref: containerRef,
  })

  useLayoutEffect(() => {
    const width = containerWidth ?? 1

    if (width <= 1) {
      return
    }

    let numColumns: number = maxColumns
    let newItemWidth = 0

    while (width && numColumns > 0) {
      const totalGap = gap * (numColumns - 1)
      const itemGap = totalGap / numColumns
      newItemWidth = width / numColumns - itemGap
      if (newItemWidth >= minWidth) {
        break
      }
      numColumns -= 1
      if (breakpoints?.length) {
        while (numColumns && !breakpoints.includes(numColumns)) {
          numColumns -= 1
        }
      }
    }

    const totalGap = gap * (numColumns - 1)
    const itemGap = totalGap / numColumns

    setItemWidth(width / numColumns - itemGap)
    setRows(chunk(records, numColumns))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    containerRef,
    maxColumns,
    containerWidth,
    gap,
    records,
    minWidth,
    setItemWidth,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    breakpoints.join(':'),
  ])

  const ListItem = ({ index, isScrolling, key, style }) => {
    let iWidth = itemWidth
    const row = rows[index]

    const totalGap = gap * (row.length - 1)
    const gapSegmentCount = row.length * 2 - 2
    const gapSegment = gapSegmentCount ? totalGap / gapSegmentCount : 0
    const itemEls: Array<React.ReactElement> = []
    row.forEach((item, i) => {
      // const child = isNativeHtmlElement(baseChild)
      //   ? baseChild
      //   : React.cloneElement(baseChild, {
      //       rowIndex: index,
      //       columnIndex: i,
      //     })
      const child = render(item)

      if (i === 0) {
        const marginRight = gapSegment
        itemEls.push(
          <Item
            key={`${key}-${i}`}
            marginRight={marginRight}
            width={iWidth}
          >
            {child}
          </Item>,
        )
      } else if (i === row.length - 1) {
        const marginLeft = gapSegment
        itemEls.push(
          <Item
            key={`${key}-${i}`}
            marginLeft={marginLeft}
            width={iWidth}
          >
            {child}
          </Item>,
        )
      } else {
        const marginRight = gapSegment
        const marginLeft = gapSegment
        itemEls.push(
          <Item
            key={`${key}-${i}`}
            marginLeft={marginLeft}
            marginRight={marginRight}
            width={iWidth}
          >
            {child}
          </Item>,
        )
      }

      // key += 1
    })
    return (
      <Row
        gap={gap}
        key={key}
        className={rowClassName}
        style={style}
      >
        {itemEls}
      </Row>
    )
  }

  return (
    <div
      className="w-full shadow-box h-384 border-4 border-b-4 border-solid border-gray-100"
      ref={containerRef}
    >
      <AutoSizer>
        {({ width, height }) => (
          <List
            className="w-full"
            height={height}
            // style={{ height: actualListHeight }}
            overscanRowCount={4}
            // noRowsRenderer={this._noRowsRenderer}
            rowCount={rows.length}
            rowHeight={48}
            rowRenderer={ListItem}
            // scrollToIndex={scrollToIndex}
            width={width}
          />
        )}
      </AutoSizer>
    </div>
  )
}

function isNativeHtmlElement(element: unknown) {
  return (
    React.isValidElement(element) && typeof element.type === 'string'
  )
}

type ContainerInput = {
  gap: number
  children: Array<ReactNode>
  className?: string
}

export function Row({
  gap,
  children,
  className,
  style,
}: ContainerInput & { style: CSSProperties }) {
  return (
    <div
      className={clsx(`flex items-stretch`, className)}
      style={{
        rowGap: gap,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

type ItemInput = {
  width: number
  marginLeft?: number
  marginRight?: number
  children: ReactNode
}

export function Item({
  width,
  marginLeft,
  marginRight,
  children,
}: ItemInput) {
  return (
    <div
      className="block"
      style={{
        width: width,
        marginLeft: marginLeft && `${marginLeft}px`,
        marginRight: marginRight && `${marginRight}px`,
      }}
    >
      {children}
    </div>
  )
}

export function getGlyph(value: number, status: string) {
  switch (status) {
    case 'missing':
      return
    case 'standalone':
      return String.fromCodePoint(value)
    case 'combining':
      return `\u25cc${String.fromCodePoint(value)}`
    case 'invisible':
      return
  }
}

export function getSlug(value: number, status: string) {
  switch (status) {
    case 'missing':
      return
    case 'standalone':
      return String.fromCodePoint(value)
    case 'combining':
    case 'invisible':
      return `U+${value.toString(16).padStart(4, '0').toUpperCase()}`
  }
}
