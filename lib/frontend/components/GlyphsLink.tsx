import FlowGrid from '@termsurf/leaf/component/FlowGrid'
import Text from '@termsurf/leaf/component/Text'
import clsx from 'clsx'
import Link from 'next/link'
import { useMemo } from 'react'

export default function GlyphsLink({
  className,
  slug,
  name,
  script,
  symbols,
  weight,
  font,
}: {
  className?: string
  slug: string
  name: string
  script?: string
  symbols: Array<{ text: string }>
  weight?: string
  font?: string
  fontSize?: number
}) {
  const records = useMemo(
    () =>
      symbols.map(record => ({
        ...record,
        font,
        script,
        fontWeight: weight,
      })),
    [symbols, font, script, weight],
  )

  return (
    <Link
      href={`/scripts/${slug}`}
      className={clsx(
        className,
        'overflow-hidden bg-zinc-100 dark:bg-zinc-800 [&>div]:hover:text-violet-600 [&>div]:transition-colors transition-colors duration-200 h-full leading-content rounded-sm w-full [&_span]:hover:text-violet-600 [&_i]:hover:text-violet-600 min-w-0',
      )}
    >
      <div className="w-full h-full p-16 flex flex-col gap-8">
        <Text className="block font-semibold lowercase text-h6 sm:text-h4 leading-content transition-colors mb-16">
          {name}
        </Text>

        <FlowGrid
          gap={16}
          className="text-h3 sm:text-h3-large text-zinc-500 transition-colors font-semibold w-full leading-content"
          records={records}
          itemRenderer={Glyph}
          more={{ text: '...', script: 'latin' }}
        />
      </div>
    </Link>
  )
}

function Glyph({
  record,
  index,
}: {
  record: {
    text: string
    script?: string
    font?: string
    fontWeight?: string
  }
  index: number
}) {
  return (
    <Text
      font={record.font}
      script={record.script}
      className={clsx(
        'block !leading-1-2',
        record.fontWeight && `font-${record.fontWeight}`,
      )}
    >
      {record.text}
    </Text>
  )
}
