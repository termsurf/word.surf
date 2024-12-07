import Grid from '@termsurf/leaf/component/Grid'
import FontsContext from '@termsurf/leaf/context/FontsContext'
import { RefObject, useContext, useMemo, useRef } from 'react'
import { useResizeObserver } from 'usehooks-ts'
import { getMeasuredMaxWidthFromStrings } from '../utilities/elements'

export default function FittedGrid({
  fontWeight,
  fontSize,
  fontFamily,
  strings,
  children,
  itemPadding,
  ...gridProps
}: {
  fontWeight: number
  fontSize: number
  fontFamily: string
  strings: Array<string>
  maxWidth?: number
  maxRows?: number
  gap: number
  itemPadding?: number
  children: React.ReactNode
}) {
  const state = useContext(FontsContext)
  const isFontLoaded = state.fonts[fontFamily]
  const ref = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>
  const { width: containerWidth = 0 } = useResizeObserver({ ref })

  const maxItemWidth = useMemo(
    () =>
      !isFontLoaded
        ? 320
        : Math.min(
            320,
            getMeasuredMaxWidthFromStrings(strings, {
              fontWeight,
              fontSize: fontSize,
              fontFamily: fontFamily,
            }) + (itemPadding ?? 0),
          ),
    [
      fontSize,
      itemPadding,
      isFontLoaded,
      fontWeight,
      fontFamily,
      strings,
    ],
  )

  const maxColumns = Math.max(
    1,
    Math.floor(containerWidth / maxItemWidth),
  )

  return (
    <div
      ref={ref}
      className="w-full"
    >
      <Grid
        maxColumns={maxColumns}
        minWidth={maxItemWidth}
        {...gridProps}
      >
        {children}
      </Grid>
    </div>
  )
}
