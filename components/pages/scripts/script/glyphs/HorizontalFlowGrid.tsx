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

type ItemElement<T> = { style?: CSSProperties; record: T }

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
  const { width } = useResizeObserver({
    ref,
  })

  useLayoutEffect(() => {
    if (width) {
      onResize(width, index)
    }
  }, [width, onResize, index])

  return (
    <div
      ref={ref} // Capture ref to measure width
      className="inline-block h-full"
      style={style}
    >
      {children}
    </div>
  )
}

export default function HorizontalFlowGrid<T>({
  records,
  gap = 0,
  itemRenderer: ItemRenderer,
  className,
}: {
  className?: string
  records: Array<T>
  gap?: number
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
      return records.map(record => ({ record }))
    }

    const items: Array<ItemElement<T>> = []

    let totalWidth = 0

    let i = 0
    for (const record of records) {
      const width = itemWidths[i]

      if (i === 0) {
        if (totalWidth + width > containerWidth) {
          break
        } else {
          items.push({
            style: {},
            record,
          })
          totalWidth += width
        }
      } else {
        if (totalWidth + gap + width > containerWidth) {
          break
        } else {
          items.push({
            style: { marginLeft: gap },
            record,
          })
          totalWidth += gap + width
        }
      }
      i++
    }

    if (items.length < records.length && totalWidth < containerWidth) {
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
      className={clsx(className, 'whitespace-nowrap')}
    >
      {visibleItems.map((item, index) => (
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
      ))}
    </div>
  )
}