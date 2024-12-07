// https://www.nltk.org/_modules/nltk/metrics/aline.html
// https://aclanthology.org/A00-2038.pdf
const C_skip: number = -1 // Cost of skipping/indel
const C_sub: number = 35 // Base cost of substitution
const C_exp: number = 45 // Base cost of expansion/compression
const C_vwl: number = 10 // Cost of vowel modification

export function compareFeatures(
  featureMatrices: Record<
    string,
    Record<string, Record<string, number>>
  >,
  soundA: Record<string, string>,
  soundB: Record<string, string>,
): number {
  let totalWeight = 0
  let totalSimilarity = 0

  for (const featureType in featureMatrices) {
    const matrix = featureMatrices[featureType]
    const valueA = soundA[featureType]
    const valueB = soundB[featureType]

    if (valueA != null && valueB != null) {
      const similarity = compareFeature(matrix, valueA, valueB)
      const weight = matrix[valueA]?.[valueA] ?? 1 // Use self-similarity as weight
      totalWeight += weight
      totalSimilarity += similarity * weight
    }
  }

  return totalWeight > 0 ? totalSimilarity / totalWeight : 0
}

function compareFeature(
  matrix: Record<string, Record<string, number>>,
  valueA: string,
  valueB: string,
): number {
  return matrix[valueA]?.[valueB] ?? 0 // Default to 0 if no comparison exists
}

// Type definitions
type AlignmentPair = [string, string]
type AlignmentResult = AlignmentPair[]
type FeatureMatrix = { [key: string]: { [key: string]: number } }
type SimilarityMatrix = { [key: number]: number }

// These would need to be populated with actual data
const feature_matrix: FeatureMatrix = {}
const similarity_matrix: SimilarityMatrix = {}
const salience: { [key: string]: number } = {}

/**
 * Compute the alignment of two phonetic strings.
 * @param str1 First string to be aligned
 * @param str2 Second string to be aligned
 * @param epsilon Adjusts threshold similarity score for near-optimal alignments (0.0 to 1.0)
 * @returns Array of possible alignments
 */
function align(
  str1: string,
  str2: string,
  epsilon: number = 0,
): AlignmentResult[] {
  if (epsilon < 0 || epsilon > 1) {
    throw new Error('Epsilon must be between 0.0 and 1.0.')
  }

  const m: number = str1.length
  const n: number = str2.length

  // Initialize similarity matrix with zeros
  const S: number[][] = Array(m + 1)
    .fill(null)
    .map(() => Array(n + 1).fill(0))

  // Fill the similarity matrix
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const edit1: number = S[i - 1][j] + sigma_skip(str1[i - 1])
      const edit2: number = S[i][j - 1] + sigma_skip(str2[j - 1])
      const edit3: number =
        S[i - 1][j - 1] + sigma_sub(str1[i - 1], str2[j - 1])

      let edit4: number = Number.NEGATIVE_INFINITY
      if (i > 1) {
        edit4 =
          S[i - 2][j - 1] + sigma_exp(str2[j - 1], str1.slice(i - 2, i))
      }

      let edit5: number = Number.NEGATIVE_INFINITY
      if (j > 1) {
        edit5 =
          S[i - 1][j - 2] + sigma_exp(str1[i - 1], str2.slice(j - 2, j))
      }

      S[i][j] = Math.max(edit1, edit2, edit3, edit4, edit5, 0)
    }
  }

  // Calculate threshold score
  const T: number = (1 - epsilon) * Math.max(...S.flat())

  // Find all alignments that meet the threshold
  const alignments: AlignmentResult[] = []
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (S[i][j] >= T) {
        alignments.push(retrieve(i, j, 0, S, T, str1, str2, []))
      }
    }
  }

  return alignments
}

/**
 * Retrieve the path through the similarity matrix S starting at (i, j).
 */
function retrieve(
  i: number,
  j: number,
  s: number,
  S: number[][],
  T: number,
  str1: string,
  str2: string,
  out: AlignmentResult,
): AlignmentResult {
  if (S[i][j] === 0) {
    return out
  }

  if (
    j > 1 &&
    S[i - 1][j - 2] +
      sigma_exp(str1[i - 1], str2.slice(j - 2, j)) +
      s >=
      T
  ) {
    out.unshift([str1[i - 1], str2.slice(j - 2, j)])
    retrieve(
      i - 1,
      j - 2,
      s + sigma_exp(str1[i - 1], str2.slice(j - 2, j)),
      S,
      T,
      str1,
      str2,
      out,
    )
  } else if (
    i > 1 &&
    S[i - 2][j - 1] +
      sigma_exp(str2[j - 1], str1.slice(i - 2, i)) +
      s >=
      T
  ) {
    out.unshift([str1.slice(i - 2, i), str2[j - 1]])
    retrieve(
      i - 2,
      j - 1,
      s + sigma_exp(str2[j - 1], str1.slice(i - 2, i)),
      S,
      T,
      str1,
      str2,
      out,
    )
  } else if (S[i][j - 1] + sigma_skip(str2[j - 1]) + s >= T) {
    out.unshift(['-', str2[j - 1]])
    retrieve(
      i,
      j - 1,
      s + sigma_skip(str2[j - 1]),
      S,
      T,
      str1,
      str2,
      out,
    )
  } else if (S[i - 1][j] + sigma_skip(str1[i - 1]) + s >= T) {
    out.unshift([str1[i - 1], '-'])
    retrieve(
      i - 1,
      j,
      s + sigma_skip(str1[i - 1]),
      S,
      T,
      str1,
      str2,
      out,
    )
  } else if (
    S[i - 1][j - 1] + sigma_sub(str1[i - 1], str2[j - 1]) + s >=
    T
  ) {
    out.unshift([str1[i - 1], str2[j - 1]])
    retrieve(
      i - 1,
      j - 1,
      s + sigma_sub(str1[i - 1], str2[j - 1]),
      S,
      T,
      str1,
      str2,
      out,
    )
  }

  return out
}

/**
 * Returns score of an indel of P.
 */
function sigma_skip(p: string): number {
  return C_skip
}

/**
 * Returns score of a substitution of P with Q.
 */
function sigma_sub(p: string, q: string): number {
  return C_sub - delta(p, q) - V(p) - V(q)
}

/**
 * Returns score of an expansion/compression.
 */
function sigma_exp(p: string, q: string): number {
  const q1: string = q[0]
  const q2: string = q[1]
  return (
    C_exp - delta(p, q1) - delta(p, q2) - V(p) - Math.max(V(q1), V(q2))
  )
}

/**
 * Return weighted sum of difference between P and Q.
 */
function delta(p: string, q: string): number {
  const features: string[] = R(p, q)
  return features.reduce(
    (total, f) => total + diff(p, q, f) * salience[f],
    0,
  )
}

/**
 * Returns difference between phonetic segments P and Q for feature F.
 */
function diff(p: string, q: string, f: string): number {
  const p_features = feature_matrix[p]
  const q_features = feature_matrix[q]
  return Math.abs(
    similarity_matrix[p_features[f]] - similarity_matrix[q_features[f]],
  )
}

/**
 * Return relevant features for segment comparison.
 */
function R(p: string, q: string): string[] {
  // if (consonants.has(p) || consonants.has(q)) {
  //   return R_c
  // }
  // return R_v
  return []
}

/**
 * Return vowel weight if P is vowel.
 */
function V(p: string): number {
  // if (consonants.has(p)) {
  //   return 0
  // }
  return C_vwl
}

/**
 * Demo function to test alignments
 */
function demo(cognate_data: string): void {
  const data: string[][] = cognate_data
    .split('\n')
    .map(pair => pair.split(','))

  for (const pair of data) {
    const alignment = align(pair[0], pair[1])[0]
    const alignmentStr = alignment
      .map(a => `(${a[0]}, ${a[1]})`)
      .join(' ')
    console.log(`${pair[0]} ~ ${pair[1]} : ${alignmentStr}`)
  }
}

export {
  R,
  V,
  align,
  delta,
  demo,
  diff,
  sigma_exp,
  sigma_skip,
  sigma_sub,
  type AlignmentPair,
  type AlignmentResult,
}
