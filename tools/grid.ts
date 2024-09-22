export function calculateGlyphColumns({
  totalCount,
  itemWidth,
  containerWidth,
}) {
  let max = Math.min(Math.floor(containerWidth / itemWidth), 7)
  while (max > 3) {
    const maxIsEven = isEven(max)
    const remainder = totalCount % max
    const remainderIsEven = isEven(remainder)
    if (maxIsEven && remainderIsEven) {
      const diff = max - remainder
      if (diff <= 2) {
        return max
      }
    } else if (!maxIsEven && (!remainderIsEven || !remainder)) {
      const diff = max - remainder
      if (diff <= 2) {
        return max
      }
    } else {
      // one is even, one is odd
    }
    max--
  }
  return max
}

function isEven(n) {
  return n % 2 === 0
}
