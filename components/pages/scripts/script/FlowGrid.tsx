import clsx from 'clsx'
import React, {
  CSSProperties,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useResizeObserver } from 'usehooks-ts'

const canvas =
  typeof document !== 'undefined'
    ? document.createElement('canvas')
    : undefined

type ItemElement<T> = { style?: CSSProperties; record: T }

function measureGlyph(element, text) {
  const context = canvas!.getContext('2d')!
  context.font = window.getComputedStyle(element).font

  const metrics = context.measureText(text)
  return metrics.width
}

function FlowGridItem({
  children,
  style,
  index,
  onResize,
}: {
  children: React.ReactNode
  style?: CSSProperties
  index: number
  onResize: (width: number, index: number) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { width = 0 } = useResizeObserver({
    ref,
  })

  useLayoutEffect(() => {
    if (width) {
      // console.log(
      //   index,
      //   measureGlyph(ref.current, ref.current.textContent),
      // )
      // console.log(index, width)
      onResize(width, index)
    }
  }, [onResize, width, index])

  return (
    <div
      className="inline-block h-full"
      style={style}
      ref={ref} // Capture ref to measure width
    >
      {children}
    </div>
  )
}

export default function FlowGrid<T>({
  records,
  gap = 0,
  itemRenderer: ItemRenderer,
  className,
  more,
}: {
  className?: string
  records: Array<T>
  gap?: number
  more?: T
  itemRenderer: ({
    record,
    index,
  }: {
    record: T
    index: number
  }) => React.ReactNode
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [itemWidths, setItemWidths] = useState<Record<number, number>>(
    {},
  )
  const { width: containerWidth } = useResizeObserver({
    ref: containerRef,
  })

  const [isMeasured, setIsMeasured] = useState(false)

  const handleResize = useCallback(
    (width: number, index: number) => {
      setItemWidths(prevWidths => {
        if (prevWidths[index] !== width) {
          return {
            ...prevWidths,
            [index]: width,
          }
        } else {
          return prevWidths
        }
      })

      if (index === records.length - 1) {
        setIsMeasured(true)
      }
    },
    [records],
  )

  const visibleItems = useMemo<Array<ItemElement<T>>>(() => {
    if (!isMeasured || !containerWidth) {
      const items = records.map(record => ({ record }))
      if (more) {
        // items.push({ record: more })
      }
      return items
    }

    const items: Array<ItemElement<T>> = []

    let totalWidth = 0

    const moreWidth = more && itemWidths[records.length - 1]
    const subRecords = more ? records.slice(0, records.length) : records

    let i = 0
    for (const record of subRecords) {
      const width = itemWidths[i]

      if (i === 0) {
        if (totalWidth + width > containerWidth) {
          break
        } else {
          items.push({
            style: { minWidth: width },
            record,
          })
          totalWidth += width
        }
      } else {
        if (totalWidth + gap + width > containerWidth) {
          if (moreWidth) {
            while (totalWidth + gap + moreWidth > containerWidth) {
              items.pop()
              const lastWidth = itemWidths[i - 1]
              totalWidth -= gap + lastWidth
            }

            items.push({
              style: { minWidth: moreWidth, marginLeft: gap },
              record: more,
            })

            totalWidth += gap + moreWidth
          }
          break
        } else {
          items.push({
            style: { minWidth: width, marginLeft: gap },
            record,
          })
          totalWidth += gap + width
        }
      }
      i++
    }

    if (
      items.length < subRecords.length &&
      totalWidth < containerWidth
    ) {
      const extraGapPerItem =
        (containerWidth - totalWidth) / (items.length - 1)

      let i = 1
      while (i < items.length) {
        const item = items[i++]
        if (item.style && typeof item.style.marginLeft === 'number') {
          item.style.marginLeft += extraGapPerItem
        }
      }
    }

    return items
  }, [containerWidth, records, isMeasured, itemWidths, gap])

  return (
    <div
      ref={containerRef}
      className={clsx(
        className,
        !isMeasured && 'opacity-0',
        'whitespace-nowrap',
      )}
    >
      {!isMeasured && more && (
        <FlowGridItem
          index={-1}
          onResize={handleResize}
        >
          <ItemRenderer
            record={more}
            index={-1}
          />
        </FlowGridItem>
      )}
      {visibleItems.map((item, index) => (
        <>
          {/* {'\u200C'} */}
          <FlowGridItem
            key={index}
            style={item.style}
            index={index}
            onResize={handleResize}
          >
            <ItemRenderer
              record={item.record}
              index={index}
            />
          </FlowGridItem>
        </>
      ))}
    </div>
  )
}
