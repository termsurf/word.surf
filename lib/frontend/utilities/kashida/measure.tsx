import {
  getMeasurerWidth,
  setMeasurerFont,
  setMeasurerText,
} from './elementMeasuring'

// https://mushafmuscat.om/
export const DIACRITIC_MAP: Record<string, string> = {
  '\n': '\n',
  ' ': ' ',
  ؠ: 'ؠ',
  آ: 'ا',
  أ: 'ا',
  ؤ: 'و',
  إ: 'ا',
  ئ: 'ى',
  ا: 'ا',
  ب: 'ب',
  ة: 'ه',
  ت: 'ت',
  ث: 'ث',
  ج: 'ج',
  ح: 'ح',
  خ: 'خ',
  د: 'د',
  ذ: 'ذ',
  ر: 'ر',
  ز: 'ز',
  س: 'س',
  ش: 'ش',
  ص: 'ص',
  ض: 'ض',
  ط: 'ط',
  ظ: 'ظ',
  ع: 'ع',
  غ: 'غ',
  ػ: 'ک',
  ؼ: 'ک',
  ؽ: 'ؽ',
  ؾ: 'ؾ',
  ؿ: 'ؿ',
  ف: 'ف',
  ق: 'ق',
  ك: 'ك',
  ل: 'ل',
  م: 'م',
  ن: 'ن',
  ه: 'ه',
  و: 'و',
  ى: 'ى',
  ي: 'ى',
  ٱ: 'ا',
  ٲ: 'ا',
  ٳ: 'ا',
  ٵ: 'ءا', // hamza alef?
  ٶ: 'ءو', // hamza waw?
  ٸ: 'ى',
  ٹ: 'ٹ',
  ٺ: 'ٺ',
  ٻ: 'ٻ',
  ټ: 'ت',
  ٽ: 'ت',
  پ: 'پ',
  ٿ: 'ٿ',
  ڀ: 'ڀ',
  ځ: 'ءح',
  ڂ: 'ح',
  ڃ: 'ڃ',
  ڄ: 'ڄ',
  څ: 'ح',
  چ: 'چ',
  ڇ: 'ڇ',
  ڈ: 'ڈ',
  ډ: 'د',
  ڊ: 'د',
  ڋ: 'د',
  ڌ: 'ڌ',
  ڍ: 'ڍ',
  ڎ: 'ڎ',
  ڏ: 'د',
  ڐ: 'د',
  ڑ: 'ڑ',
  ڒ: 'ر',
  ړ: 'ر',
  ڔ: 'ر',
  ڕ: 'ر',
  ږ: 'ر',
  ڗ: 'ر',
  ژ: 'ژ',
  ڙ: 'ڙ',
  ښ: 'س',
  ڛ: 'س',
  ڜ: 'س',
  ڝ: 'ص',
  ڞ: 'ص',
  ڟ: 'ط',
  ڠ: 'ع',
  ڡ: 'ڡ',
  ڢ: 'ڡ',
  ڣ: 'ڡ',
  ڤ: 'ڤ',
  ڥ: 'ڡ',
  ڦ: 'ڦ',
  ڧ: 'ق',
  ڨ: 'ق',
  ک: 'ک',
  ڪ: 'ڪ',
  ګ: 'ك',
  ڬ: 'ك',
  ڭ: 'ڭ',
  ڮ: 'ك',
  گ: 'گ',
  ڰ: 'گ',
  ڱ: 'ڱ',
  ڲ: 'گ',
  ڳ: 'ڳ',
  ڴ: 'گ',
  ڵ: 'ل',
  ڶ: 'ل',
  ڷ: 'ل',
  ڸ: 'ل',
  ڹ: 'ن',
  ں: 'ں',
  ڻ: 'ڻ',
  ڼ: 'ن',
  ڽ: 'ن',
  ھ: 'ه',
  ڿ: 'چ',
  ۀ: 'ه',
  ہ: 'ہ',
  ۂ: 'ءہ',
  ۃ: 'ہ',
  ۄ: 'و',
  ۅ: 'ۅ',
  ۆ: 'ۆ',
  ۇ: 'ۇ',
  ۈ: 'ۈ',
  ۉ: 'ۉ',
  ۊ: 'و',
  ۋ: 'ۋ',
  ی: 'ی',
  ۍ: 'ي',
  ێ: 'ي',
  ۏ: 'و',
  ې: 'ې',
  ۑ: 'ي',
  ے: 'ے',
  ۓ: 'ے',
  ە: 'ە',
  ۺ: 'ش',
  ۻ: 'ض',
  ۼ: 'ۼ',
  ۿ: 'ه',
}

export type MeasurementStateType = {
  fontSize: number
  kashidaWidth: number
  maxWidth: number
}

export type WordDataType = {
  after: boolean
  i: number
  match: number
  type: string
  word: string
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
    var text = list.join(' ')
    var size = measureLine(text)

    if (size > state.maxWidth) {
      line = [word]
      lines.push(line)
    } else {
      line.push(word)
    }
  }

  return lines
}

export function formatLine(
  line: Array<string>,
  state: MeasurementStateType,
) {
  const width = measureLine(line.join(' '))

  if (width === state.maxWidth) {
    return line
  }

  let remaining = state.maxWidth - width

  const words: Array<WordDataType> = []

  // https://www.khtt.net/en/page/1821/the-big-kashida-secret
  line.forEach((word, i) => {
    // const withoutDiacritics = removeDiacritics(word)
    let match = getLastMatchIndex(word, /ـ/g)

    if (match > -1) {
      words.push({
        after: true,
        i,
        match,
        type: 'kashida',
        word,
      })
      return
    }

    match = getLastMatchIndex(word, /[سص]\u0600-\u06FF/g)

    if (match > -1) {
      words.push({
        after: true,
        i,
        match,
        type: 'seen-sad-i-m',
        word,
      })
      return
    }

    match = getLastMatchIndex(word, /^[سص]/g)

    if (match > -1) {
      words.push({
        after: true,
        i,
        match,
        type: 'seen-sad-i-m',
        word,
      })
      return
    }

    match = getLastMatchIndex(word, /[\u0629حد]$/g)

    if (match > -1) {
      words.push({
        after: false,
        i,
        match,
        type: 'taa-f',
        word,
      })
      return
    }

    match = getLastMatchIndex(word, /[الكگ]$/g)

    if (match > -1) {
      words.push({
        after: false,
        i,
        match,
        type: 'kaf-f',
        word,
      })
      return
    }

    match = getLastMatchIndex(word, /\u0600-\u06FF[رےيى]\u0600-\u06FF/g)

    if (match > -1) {
      words.push({
        after: false,
        i,
        match,
        type: 'ra-m',
        word,
      })
      return
    }

    match = getLastMatchIndex(word, /\u0600-\u06FF[وعقف]$/g)

    if (match > -1) {
      words.push({
        after: false,
        i,
        match,
        type: 'waw-f',
        word,
      })
      return
    }
  })

  const eachWidth = words.length ? remaining / words.length : 0

  if (eachWidth === 0) {
    return line
  }

  const numKashida = Math.floor(eachWidth / state.kashidaWidth)

  words.forEach(data => {
    line[data.i] = data.after
      ? data.word.slice(0, data.match + 1) +
        repeatString('ـ', numKashida) +
        data.word.slice(data.match + 1)
      : data.word.slice(0, data.match) +
        repeatString('ـ', numKashida) +
        data.word.slice(data.match)
  })

  return line
}

export function layout(
  lines: Array<Array<string>>,
  state: MeasurementStateType,
) {
  const result: Array<Array<string>> = []
  for (const line of lines) {
    const newLine = formatLine(line, state)
    result.push(newLine)
  }
  return result
}

export function measureLine(line: string) {
  setMeasurerText(line)
  return getMeasurerWidth()
}

export function removeDiacritics(text: string) {
  const symbols = [...text]
  const result: Array<string> = []
  for (const symbol of symbols) {
    if (DIACRITIC_MAP[symbol]) {
      result.push(symbol)
    }
  }
  return result.join('')
}

export function renderArabicLines(
  words: Array<string>,
  family: string,
  fontSize: number,
  maxWidth: number,
) {
  setMeasurerFont({ family, size: fontSize })
  const kashidaWidth = measureLine('ـ')
  const state = { fontSize, kashidaWidth, maxWidth }
  const lines = computeLines(words, state)
  const finalLines = layout(lines, state)
  return finalLines.map(line => line.join(' '))
}

function getLastMatchIndex(str: string, pattern: RegExp) {
  let i = -1
  let match
  while ((match = pattern.exec(str)) != null) {
    i = match.index
  }
  return i
}

function getFirstMatchIndex(str: string, pattern: RegExp) {
  let i = -1
  let match
  while ((match = pattern.exec(str)) != null) {
    return match.index
  }
  return i
}

function repeatString(str: string, count: number) {
  return new Array(count + 1).join(str)
}
