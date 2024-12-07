import {
  addToMeasurer,
  removeFromMeasurer,
} from '../kashida/elementMeasuring'
import GLYPHS, { GlyphType, GlyphWithAdjustmentType } from './glyphs'

export const ALPHABET = [
  '\u05d0',
  '\u05d1',
  '\u05d2',
  '\u05d3',
  '\u05d4',
  '\u05d5',
  '\u05d6',
  '\u05d7',
  '\u05d8',
  '\u05d9',
  '\u05da',
  '\u05db',
  '\u05dc',
  '\u05dd',
  '\u05de',
  '\u05df',
  '\u05e0',
  '\u05e1',
  '\u05e2',
  '\u05e3',
  '\u05e4',
  '\u05e5',
  '\u05e6',
  '\u05e7',
  '\u05e8',
  '\u05e9',
  '\u05ea',
  '\u05c6',
]

export type MeasurementSpreadParamsType = {
  glyph: GlyphWithAdjustmentType
  scalePriority: number
}

const scalePriority: Record<string, number> = {
  ב: 5,
  ד: 1,
  ה: 3,
  ל: 6,
  ר: 2,
  ת: 4,
}

export type MeasurementStateType = {
  alphabet: Array<string>
  bounds: Array<DOMRect>
  fontSize: number
  lineOffset: number
  maxWidth: number
  spaceOffset: number
  svgHeightToViewportHeightRatio: number
}

export function computeLines(
  words: Array<string>,
  state: MeasurementStateType,
) {
  let line: Array<string> = []
  const lines: Array<Array<string>> = [line]

  let i = 0

  while (i < words.length) {
    var word = words[i++]
    var list = line.concat(word)
    //if (list.join('').length > 28) {
    //  line = [word.text]
    //  lines.push(line)
    //} else {
    var text = list.join(' ')
    var size = sumLine(
      text.split('').map(x => {
        return { adjust: 0, symbol: x }
      }),
      state,
    )

    if (size > state.maxWidth) {
      line = [word]
      lines.push(line)
    } else {
      line.push(word)
    }
    //}
  }

  return lines
}

export function getOffset(
  glyph: GlyphWithAdjustmentType,
  state: MeasurementStateType,
) {
  const idx = state.alphabet.indexOf(glyph.symbol)
  const bounds = state.bounds[idx]
  const width = bounds.width + glyph.adjust
  return width
}

export function initializeState(
  fontSize: number,
  containerWidth: number,
): MeasurementStateType {
  const alphabet = ALPHABET
  const svgHeightToViewportHeightRatio = (240 + 2100) / fontSize
  const bounds = measureAllSVGGlyphs(alphabet, fontSize).map(x => ({
    ...x,
    width: x.width * svgHeightToViewportHeightRatio,
  }))
  const maxWidth = containerWidth * svgHeightToViewportHeightRatio
  const spaceOffset = 14 * svgHeightToViewportHeightRatio
  // const spaceOffset = bounds[alphabet.indexOf('ד')].width / 1.5
  return {
    alphabet,
    bounds,
    fontSize,
    lineOffset: 0,
    maxWidth,
    spaceOffset: spaceOffset,
    svgHeightToViewportHeightRatio,
  }
}

function formatLine(line: Array<string>, state: MeasurementStateType) {
  const glyphs = line
    .join(' ')
    .split('')
    .map(x => {
      return { adjust: 0, symbol: x }
    })

  if (glyphs[glyphs.length - 1].symbol == ' ') {
    glyphs.pop()
  }
  if (glyphs[0].symbol == ' ') {
    glyphs.shift()
  }

  const initialSize = Math.ceil(sumLine(glyphs, state))
  const idealWidth = state.maxWidth

  if (initialSize === idealWidth) {
    return glyphs
  }

  let remaining = idealWidth - initialSize

  const stretchA: Array<MeasurementSpreadParamsType> = []
  const stretchB: Array<MeasurementSpreadParamsType> = []
  const stretchC: Array<MeasurementSpreadParamsType> = []
  const stretchD: Array<MeasurementSpreadParamsType> = []

  glyphs.forEach((br, i) => {
    if (!glyphs[i + 1]) {
      if (scalePriority[br.symbol]) {
        stretchA.push({
          glyph: br,
          scalePriority: scalePriority[br.symbol],
        })
      }
    } else if (glyphs[i + 1].symbol == ' ') {
      // last symbol
      if (scalePriority[br.symbol]) {
        stretchA.push({
          glyph: br,
          scalePriority: scalePriority[br.symbol],
        })
      }
    } else if (!glyphs[i + 2]) {
      if (scalePriority[br.symbol]) {
        stretchB.push({
          glyph: br,
          scalePriority: scalePriority[br.symbol],
        })
      }
    } else if (glyphs[i + 2].symbol == ' ') {
      // last symbol
      if (scalePriority[br.symbol]) {
        stretchB.push({
          glyph: br,
          scalePriority: scalePriority[br.symbol],
        })
      }
    } else if (!glyphs[i + 3]) {
      if (scalePriority[br.symbol]) {
        stretchC.push({
          glyph: br,
          scalePriority: scalePriority[br.symbol],
        })
      }
    } else if (
      glyphs
        .slice(i, i + 3)
        .map(x => x.symbol)
        .join()
        .match(/^\w+$/)
    ) {
      // last symbol
      if (scalePriority[br.symbol]) {
        stretchC.push({
          glyph: br,
          scalePriority: scalePriority[br.symbol],
        })
      }
    } else if (
      glyphs
        .slice(i, i + 4)
        .map(x => x.symbol)
        .join()
        .match(/^\w+$/)
    ) {
      // last symbol
      if (scalePriority[br.symbol]) {
        stretchD.push({
          glyph: br,
          scalePriority: scalePriority[br.symbol],
        })
      }
    } else if (glyphs[i - 1] && glyphs[i - 1].symbol == ' ') {
      // last symbol
      if (scalePriority[br.symbol]) {
        stretchD.push({
          glyph: br,
          scalePriority: scalePriority[br.symbol],
        })
      }
    }
  })

  stretchA.sort((a, b) => a.scalePriority - b.scalePriority)
  stretchB.sort((a, b) => a.scalePriority - b.scalePriority)
  stretchC.sort((a, b) => a.scalePriority - b.scalePriority)
  stretchD.sort((a, b) => a.scalePriority - b.scalePriority)

  const spectrum: Array<number> = [
    1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
  ]

  const spectrum2: Array<number> = []

  if (stretchA.length) {
    spectrum2.push(1.0)
  } else {
    spectrum2.push(0.0)
  }
  if (stretchB.length) {
    spectrum2.push(1.0)
  } else {
    spectrum2.push(0.0)
  }
  if (stretchC.length) {
    spectrum2.push(1.0)
  } else {
    spectrum2.push(0.0)
  }
  if (stretchD.length) {
    spectrum2.push(1.0)
  } else {
    spectrum2.push(0.0)
  }

  const totals = splitSpectrum(remaining, spectrum2)

  const adjustmentsA = stretchA.length
    ? splitSpectrum(totals[0], spectrum.slice(0, stretchA.length))
    : []
  const adjustmentsB = stretchB.length
    ? splitSpectrum(totals[1], spectrum.slice(0, stretchB.length))
    : []
  const adjustmentsC = stretchC.length
    ? splitSpectrum(totals[2], spectrum.slice(0, stretchC.length))
    : []
  const adjustmentsD = stretchD.length
    ? splitSpectrum(totals[3], spectrum.slice(0, stretchD.length))
    : []

  while (remaining && adjustmentsA.length) {
    var i = getRandomInteger(0, adjustmentsA.length - 1)
    var y = stretchA[i]
    var x = adjustmentsA[i]
    adjustmentsA.splice(i, 1)
    stretchA.splice(i, 1)
    const r = remaining
    remaining = Math.max(0, remaining - x)
    y.glyph.adjust = remaining === 0 ? r : x
  }

  //if (remaining) {
  while (remaining && adjustmentsB.length) {
    var i = getRandomInteger(0, adjustmentsB.length - 1)
    var y = stretchB[i]
    var x = adjustmentsB[i]
    adjustmentsB.splice(i, 1)
    stretchB.splice(i, 1)
    const r = remaining
    remaining = Math.max(0, remaining - x)
    y.glyph.adjust = remaining === 0 ? r : x
  }
  //}

  //if (remaining) {
  while (remaining && adjustmentsC.length) {
    var i = getRandomInteger(0, adjustmentsC.length - 1)
    var y = stretchC[i]
    var x = adjustmentsC[i]
    adjustmentsC.splice(i, 1)
    stretchC.splice(i, 1)
    const r = remaining
    remaining = Math.max(0, remaining - x)
    y.glyph.adjust = remaining === 0 ? r : x
  }
  //}

  //if (remaining) {
  while (remaining && adjustmentsD.length) {
    var i = getRandomInteger(0, adjustmentsD.length - 1)
    var y = stretchD[i]
    var x = adjustmentsD[i]
    adjustmentsD.splice(i, 1)
    stretchD.splice(i, 1)
    const r = remaining
    remaining = Math.max(0, remaining - x)
    y.glyph.adjust = remaining === 0 ? r : x
  }
  //}

  return glyphs
}

function createDynamicPath(
  index: number,
  path: string,
  symbol: string,
  scale: number,
  state: MeasurementStateType,
) {
  const i = state.alphabet.indexOf(symbol)
  const bounds = state.bounds[i]

  state.lineOffset += bounds.width + scale

  const transform = `translate(${
    state.maxWidth - state.lineOffset
  }, 0) scale(${1},-${1})`

  return (
    <path
      key={index}
      d={path.replace(/\s+/g, ' ')}
      transform={transform}
    />
  )
}

// function createSpace(index: number, state: MeasurementStateType) {
//   const el = (
//     <rect
//       key={index}
//       width={state.spaceOffset}
//       height={0}
//       transform={`translate(${state.lineOffset},0)`}
//     />
//   )

//   state.lineOffset += state.spaceOffset

//   return el
// }

export function layout(
  lines: Array<Array<string>>,
  state: MeasurementStateType,
) {
  const svgs: Array<React.ReactNode> = []

  let I = 0

  lines.forEach((line, i) => {
    state.lineOffset = 0

    const glyphs =
      i != lines.length - 1
        ? formatLine(line, state)
        : line
            .join(' ')
            .split('')
            .map(x => {
              return { adjust: 0, symbol: x }
            })

    const paths: Array<React.ReactNode> = []

    glyphs.forEach(glyph => {
      const g = GLYPHS[glyph.symbol]
      const text = typeof g == 'function' ? g(glyph.adjust) : g

      if (glyph.symbol == ' ' || glyph.symbol == '\u00a0') {
        // paths.push(createSpace(I, state))
        state.lineOffset += state.spaceOffset
        // I++
      } else {
        paths.push(
          createDynamicPath(I, text, glyph.symbol, glyph.adjust, state),
        )

        I++

        // paths.push(createSpace(I, state))
        // state.lineOffset += SPACE_OFFSET

        I++
      }
    })

    svgs.push(
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="100%"
        viewBox={`0 -2100 ${state.maxWidth} 2100`}
        height={`${state.fontSize}`}
      >
        {paths}
      </svg>,
    )

    state.lineOffset = 0
  })

  return svgs
}

export function measureAllSVGGlyphs(
  glyphs: Array<string>,
  fontSize: number,
) {
  const svg = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'svg',
  )
  svg.setAttribute('viewBox', '0 -900 52000 2100')
  svg.setAttribute('version', '1.1')
  svg.setAttribute('height', `${fontSize}`)

  addToMeasurer(svg)

  const measurements = glyphs.map(symbol =>
    measureSVGGlyph(svg, GLYPHS[symbol]),
  )

  removeFromMeasurer(svg)

  return measurements
}

export function measureSVGGlyph(svg: Node, path: GlyphType) {
  // document.body.style['line-height'] = LINE_HEIGHT + 'px'
  // document.body.style['font-size'] = FONT_SIZE + 'px'

  const el = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'path',
  )

  el.setAttribute(
    'd',
    (typeof path == 'function' ? path() : path).replace(/\s+/g, ' '),
  )

  svg.appendChild(el)

  const rect = el.getBoundingClientRect()

  svg.removeChild(el)

  return rect
  // return svg.querySelector('path').getBoundingClientRect()
}

export function render(
  words: Array<string>,
  fontSize: number,
  maxWidth: number,
) {
  const state = initializeState(fontSize, maxWidth)
  const lines = computeLines(words, state)
  const svgs = layout(lines, state)
  return svgs
}

function getRandomInteger(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

function sumLine(
  glyphs: Array<GlyphWithAdjustmentType>,
  state: MeasurementStateType,
) {
  let sum = 0
  glyphs.forEach(glyph => {
    if (glyph.symbol == ' ' || glyph.symbol == '\u00a0') {
      sum += state.spaceOffset
    } else {
      sum += getOffset(glyph, state)
    }
  })
  return sum
}

function splitSpectrum(total: number, spectrum: Array<number>) {
  var smallSum = 0
  spectrum.forEach(x => (smallSum += x))
  var ratios = spectrum.map(x => x / smallSum)
  return ratios.map(x => x * total)
}
