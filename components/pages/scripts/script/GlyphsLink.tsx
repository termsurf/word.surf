import Grid from '@termsurf/leaf/component/Grid'
import Text from '@termsurf/leaf/component/Text'
import clsx from 'clsx'
import Link from 'next/link'

export default function GlyphsLink({
  className,
  slug,
  name,
  script,
  symbols,
  weight,
  font,
  fontSize,
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
  return (
    <Link
      href={`/scripts/${slug}`}
      className={clsx(
        className,
        'shadow-small1 hover:shadow-small2 flex flex-col bg-gray-50 [&>div]:hover:text-violet-600 [&>div]:transition-colors transition-all duration-200 p-16 h-full leading-content rounded-sm w-full [&_span]:hover:text-violet-600 [&_i]:hover:text-violet-600 min-w-0',
      )}
    >
      <Text className="block font-semibold lowercase text-h4 leading-content transition-colors mb-16">
        {name}
      </Text>

      <Grid
        maxColumns={24}
        maxRows={1}
        minWidth={56}
        maxWidth={56}
        gap={16}
        className="text-h3 text-gray-500 transition-colors font-bold"
      >
        {symbols.map((glyph, i) => (
          <Text
            key={`${glyph.text}-${i}`}
            font={font}
            size={fontSize}
            script={script}
            className={clsx(
              'block !leading-1-2',
              weight && `font-${weight}`,
            )}
          >
            {glyph.text}
          </Text>
        ))}
      </Grid>
    </Link>
  )
}
