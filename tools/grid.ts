export function distributeGridLayout(
  length: number,
  maxColumns: number,
  minColumns = 1,
) {
  function recur(
    dp: Array<Set<number>>,
    length: number,
    width: number,
  ) {
    if (length == 0) {
      return []
    }

    if (length < width - 2 || width <= 0) {
      return
    }

    if (dp[width].has(length)) {
      return
    }

    dp[width].add(length)

    for (let i = 0; i < 2; i++) {
      let result = recur(dp, length - width, width)
      if (result) {
        return [width, ...result]
      }
      width -= 2
    }

    return
  }

  if (length <= maxColumns) {
    return [length]
  }

  if (maxColumns >= 3 && length === 7) {
    return [3, 3, 1]
  }

  if (maxColumns >= minColumns && length % maxColumns === 0) {
    const result: Array<number> = []
    while (length) {
      result.push(maxColumns)
      length -= maxColumns
    }
    return result
  }

  if (maxColumns > minColumns && length % (maxColumns - 1) === 0) {
    const result: Array<number> = []
    maxColumns--
    while (length) {
      result.push(maxColumns)
      length -= maxColumns
    }
    return result
  }

  const dec = 2 - (length % 2)

  maxColumns -= maxColumns % dec

  const dp: Array<Set<number>> = Array.from(
    { length: maxColumns + 1 },
    () => new Set(),
  )

  for (let width = maxColumns; width > 0; width -= dec) {
    const result = recur(dp, length - width, width)
    if (result) {
      if (width <= minColumns) {
        return
      }
      return [width, ...result]
    }
  }

  return
}

export function distributeGridLayout2(
  length: number,
  maxColumns: number,
) {
  const rows: Array<number> = []

  maxColumns = Math.max(maxColumns, 2)

  if (isEven(length)) {
    if (!isEven(maxColumns)) {
      maxColumns--
    }
  } else {
    if (isEven(maxColumns)) {
      maxColumns--
    }
  }

  while (length) {
    if (length >= maxColumns) {
      rows.push(maxColumns)
    } else {
      rows.push(length)
    }
    length = Math.max(0, length - maxColumns)
  }

  return rows
}

function isEven(n: number) {
  return n % 2 === 0
}
