const canvas =
  typeof window === 'undefined'
    ? undefined
    : document.createElement('canvas')

type FontData = {
  fontWeight: number | string
  fontSize: number
  fontFamily: string
}

export function getMeasuredMaxWidthFromStrings(
  strings: Array<string>,
  fontData: FontData,
) {
  loadFontMeasurer(fontData)
  return Math.ceil(Math.max(...strings.map(measureText)))
}

export function measureText(text: string) {
  if (!canvas) return 0

  const context = canvas.getContext('2d')
  if (!context) return 0

  const metrics = context.measureText(text)
  return metrics.width
}

export function loadFontMeasurer({
  fontWeight,
  fontSize,
  fontFamily,
}: FontData) {
  if (!canvas) return

  const context = canvas.getContext('2d')
  if (!context) return

  context.font = `${fontWeight} ${fontSize}px ${fontFamily}`
}

// loadFontMeasurer({
//   fontWeight: 600,
//   fontSize: 32,
//   fontFamily,
// })
