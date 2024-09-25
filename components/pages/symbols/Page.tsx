'use client'

// import { Document, Index, Worker } from 'flexsearch'

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

import Text from '@termsurf/leaf/component/Text'
import Link from 'next/link'
import React, {
  CSSProperties,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Cached } from './config'

const KEY = '/languages'

const abbrs = {
  '0005': 'ENQ',
  '0006': 'ACK',
  '0008': 'BS',
  '0009': 'HT',
  '000A': 'LF',
  '000B': 'VT',
  '000C': 'FF',
  '000D': 'CR',
  '000E': 'SO',
  '000F': 'SI',
  '0015': 'NACK',
  '001A': 'SUB',
  '001B': 'ESC',
  '001C': 'FS',
  '001D': 'GS',
  '001E': 'RS',
  '001F': 'US',
  '0020': 'SP',
  '007F': 'DEL',
  '0084': 'IND',
  '0085': 'NEL',
  '00A0': 'NBSP',
  '00AD': 'SHY',
  '034F': 'CGJ',
  '200B': 'ZWSP',
  '200C': 'ZWNJ',
  '200D': 'ZWJ',
  '200E': 'LRM',
  '200F': 'RLM',
  '202A': 'LRE',
  '202B': 'RLE',
  '202C': 'PDF',
  '202D': 'LRO',
  '202E': 'RLO',
  '202F': 'NNBSP',
  '2060': 'WJ',
  FE00: 'VS1',
  FEFF: 'BOM',
  '2066': 'LRI',
  '2067': 'RLI',
  '2068': 'FSI',
  '2069': 'PDI',
  '0000': 'NUL',
  '0001': 'SOH',
  '0002': 'STX',
  '0003': 'ETX',
  '0004': 'EOT',
  '0007': 'BEL',
  '0010': 'DLE',
  '0011': 'DC1',
  '0012': 'DC2',
  '0013': 'DC3',
  '0014': 'DC4',
  '0016': 'SYN',
  '0017': 'ETB',
  '0018': 'CAN',
  '0019': 'EOM',
  '0080': 'PAD',
  '0081': 'HOP',
  '0082': 'BPH',
  '0083': 'NBH',
  '0086': 'SSA',
  '0087': 'ESA',
  '0090': 'DCS',
  '0093': 'STS',
  '0094': 'CCH',
  '0095': 'MW',
  '0098': 'SOS',
  '0099': 'SGC',
  '009A': 'SCI',
  '009B': 'CSI',
  '009C': 'ST',
  '009D': 'OSC',
  '009E': 'PM',
  '009F': 'APC',
  '061C': 'ALM',
  '180B': 'FVS1',
  '180C': 'FVS2',
  '180D': 'FVS3',
  '180E': 'MVS',
  '180F': 'FVS4',
  '205F': 'MMSP',
}

let value = parseInt('FE00', 16)
while (value >= parseInt('FE00', 16) && value <= parseInt('FE0F', 16)) {
  const diff = value - parseInt('FE00', 16) + 1
  abbrs[value.toString(16).toUpperCase().padStart(4, '0')] = `VS${diff}`
  value++
}
value = parseInt('E0100', 16)
while (
  value >= parseInt('E0100', 16) &&
  value <= parseInt('E01EF', 16)
) {
  const diff = value - parseInt('E0100', 16) + 17
  abbrs[value.toString(16).toUpperCase().padStart(4, '0')] = `VS${diff}`
  value++
}

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
      {/* <P
        type="secondary"
        align="center"
      >
        Browse {(1114112).toLocaleString()} glyphs
      </P> */}
    </header>
  )
}

function Body() {
  const [rangesSubset, setRangesSubset] = useState(ranges.slice(0, 128))

  const { glyphs, fonts } = useMemo(() => {
    const glyphs: Array<any> = []
    const fonts = {}
    for (const range of rangesSubset) {
      let i = range.start
      let n = range.end
      while (i <= n) {
        const slug = getSlug(i, range.status)
        const glyph = getGlyph(i, range.status)
        range.font
          ?.split(/\s*,\s*/)
          .forEach(font => (fonts[font] = true))
        glyphs.push({
          slug,
          glyph,
          font: range.font,
          block: range.block,
          status: range.status,
          code: `U+${i.toString(16).padStart(4, '0').toUpperCase()}`,
          search: `U+${i
            .toString(16)
            .padStart(4, '0')
            .toUpperCase()} u${i
            .toString(16)
            .padStart(4, '0')
            .toUpperCase()} ${i
            .toString(16)
            .padStart(4, '0')
            .toUpperCase()} ${glyph} ${range.block}`.toLowerCase(),
        })
        i++
      }
    }
    return { glyphs, fonts }
  }, [rangesSubset])

  useFonts(Object.keys(fonts))

  useEffect(() => {
    const timer = setTimeout(() => setRangesSubset(ranges), 256)

    return () => clearTimeout(timer)
  }, [])

  // const index = new Index(options)
  // const document = new Document(options)
  // const worker = new Worker(options)

  const [search, setSearch] = useState<string | undefined>()

  const pattern = search?.toLowerCase()

  // Change the pattern
  // https://medium.com/@ngrato/harnessing-the-power-of-web-workers-with-next-js-350901a99a10
  const filteredGlyphs = pattern
    ? glyphs.filter(glyph => glyph.search.indexOf(pattern) > -1)
    : glyphs

  return (
    <>
      <div className="relative w-full pb-64 flex flex-col gap-16 p-16">
        <TextInput
          value={search}
          size="large"
          placeholder={`Search unicode character (❤️, U+2764, symbol)`}
          onChange={v => setSearch(v ?? '')}
        />
        {/* <H2 className="!text-2xl !mb-0 !text-gray-600 !border-0 text-center uppercase scale-y-80 tracking-wide-015">
          Ancient
        </H2> */}
        <VirtualizedGrid
          minWidth={96}
          gap={2}
          rowHeight={96}
          maxColumns={8}
          breakpoints={[8, 4, 2]}
          records={filteredGlyphs}
          render={Glyph}
        />
      </div>
    </>
  )
}

function Glyph({
  glyph,
  slug,
  font,
  code,
  status,
}: {
  glyph?: string | undefined
  slug?: string | undefined
  font?: string
  code: string
  status: string
}) {
  if (!slug) {
    return (
      <div className="mb-2 rounded-sm bg-gray-200 h-94 flex text-xl justify-center items-center p-4">
        {' '}
      </div>
    )
  }

  // if (!glyph) {
  //   return (
  //     <div className="mb-2 rounded-sm bg-gray-50 h-94 flex text-xl justify-center items-center p-4">
  //       {' '}
  //     </div>
  //   )
  // }

  const fontStyle = font ? font.split(/\s*,\s*/) : font

  return (
    <Link
      href={`/symbols/${slug}`}
      className="overflow-hidden mb-2 rounded-sm bg-gray-50 h-94 flex text-h2 justify-center items-center p-4 hover:text-violet-600 transition-colors hover:bg-gray-100"
      title={code}
    >
      <Text
        className={
          status === 'abbreviation'
            ? `border-2 border-dotted text-base px-4`
            : undefined
        }
        font={fontStyle}
      >
        {glyph}
      </Text>
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
  rowHeight: number
  records: Array<any>
  align?: 'left'
  breakpoints?: Array<number>
  stretchLast?: boolean
  render: any
}
function VirtualizedGrid({
  className,
  rowClassName,
  rowHeight,
  maxColumns = 2,
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
  const { width: containerWidth = 16, height: containerHeight = 16 } =
    useResizeObserver({
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

    numColumns = Math.max(1, numColumns)

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

  const ListItem = ({ index, key, style }) => {
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
    <>
      <div
        className="w-full shadow-box h-384 border-4 border-b-4 border-solid border-gray-100"
        ref={containerRef}
      >
        <List
          className="w-full"
          height={containerHeight}
          // style={{ height: actualListHeight }}
          overscanRowCount={4}
          // noRowsRenderer={this._noRowsRenderer}
          rowCount={rows.length}
          rowHeight={rowHeight}
          rowRenderer={ListItem}
          // scrollToIndex={scrollToIndex}
          width={containerWidth}
        />
      </div>
    </>
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
    case 'abbreviation':
      return abbrs[value.toString(16).toUpperCase().padStart(4, '0')]
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
    case 'abbreviation':
      return `U+${value.toString(16).padStart(4, '0').toUpperCase()}`
  }
}
