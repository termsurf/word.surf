function distribute(length: number, maxColumns: number) {
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

  const dec = 2 - (length % 2)

  maxColumns -= maxColumns % dec

  const dp: Array<Set<number>> = Array.from(
    { length: maxColumns + 1 },
    () => new Set(),
  )

  for (let width = maxColumns; width > 0; width -= dec) {
    const result = recur(dp, length - width, width)
    if (result) {
      return [width, ...result]
    }
  }

  return
}
