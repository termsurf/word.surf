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
  disabled = false,
  weight,
  font,
  fontSize,
}: {
  className?: string
  slug: string
  name: string
  script?: string
  disabled?: boolean
  symbols: Array<string>
  weight?: string
  font?: string
  fontSize?: number
}) {
  if (disabled) {
    return (
      <div
        className={clsx(
          className,
          'shadow-small1 flex flex-col bg-gray-100 text-left p-16 h-full leading-content rounded-sm w-full',
        )}
      >
        <Text className="block font-semibold lowercase text-h4 leading-content transition-colors mb-16">
          {name}
        </Text>
        <div className="flex flex-wrap gap-16 text-h3 text-gray-400 transition-colors font-bold">
          {symbols.map((glyph, i) => (
            <Text
              key={`${glyph}-${i}`}
              font={font}
              size={fontSize}
              className={clsx(
                'block !leading-1-2',
                weight && `font-${weight}`,
              )}
            >
              {glyph}
            </Text>
          ))}
        </div>
      </div>
    )
  }

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
        minWidth={36}
        maxWidth={36}
        gap={0}
        className="text-h3 text-gray-500 transition-colors font-bold"
      >
        {symbols.map((glyph, i) => (
          <Text
            key={`${glyph}-${i}`}
            font={font}
            size={fontSize}
            className={clsx(
              'block !leading-1-2',
              weight && `font-${weight}`,
            )}
          >
            {glyph}
          </Text>
        ))}
      </Grid>
    </Link>
  )
}
