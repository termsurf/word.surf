import { TONE_CODE } from './id'

// Constants for bit manipulation
const BIG_0 = BigInt(0)
const BIG_1 = BigInt(1)
const BIG_2 = BigInt(2)
const BIG_MAX = (BIG_2 ^ BigInt(63)) - BigInt(1)
const KEY = BigInt(0xdeadbeef)
const ROUNDS = 4

// Use 32 bits for each half to ensure proper mixing
const HALF_BITS = BigInt(32)
const HALF_MASK = (BIG_1 << HALF_BITS) - BIG_1

function feistelRound(
  left: bigint,
  right: bigint,
  key: bigint,
  round: number,
): [bigint, bigint] {
  // F function: multiply by key and add round number for mixing
  const f = (right * key + BigInt(round)) & HALF_MASK
  const newRight = (left ^ f) & HALF_MASK
  return [right, newRight]
}

function encrypt(value: bigint): bigint {
  let left = (value >> HALF_BITS) & HALF_MASK
  let right = value & HALF_MASK

  for (let round = 0; round < ROUNDS; round++) {
    const roundKey = KEY + BigInt(round)
    ;[left, right] = feistelRound(left, right, roundKey, round)
  }

  return (left << HALF_BITS) | right
}

function decrypt(value: bigint): bigint {
  let left = (value >> HALF_BITS) & HALF_MASK
  let right = value & HALF_MASK

  for (let round = ROUNDS - 1; round >= 0; round--) {
    const roundKey = KEY + BigInt(round)
    ;[right, left] = feistelRound(right, left, roundKey, round)
  }

  return (left << HALF_BITS) | right
}

export function bigintToIdTone(value: bigint | string) {
  return bigintToId(value, TONE_CODE)
}

export function bigintToId(
  input: bigint | string,
  alphabet: string,
): string {
  const value = typeof input === 'string' ? BigInt(input) : input

  if (value < BIG_0) {
    throw new Error('Value must be non-negative')
  }

  const base = BigInt(alphabet.length)
  if (base < BIG_2) {
    throw new Error('Alphabet must contain at least 2 characters')
  }

  // Apply encryption
  const encrypted = encrypt(value)

  if (encrypted === BIG_0) {
    return alphabet[0].repeat(16)
  }

  // Convert to custom base
  const digits: Array<number> = []
  let temp = encrypted

  while (temp > BIG_0) {
    digits.push(Number(temp % base))
    temp = temp / base
  }

  // Build result string
  return digits
    .reverse()
    .map(i => alphabet[i])
    .join('')
    .padStart(16, alphabet[0])
}

export function idToBigIntTone(id: string) {
  return idToBigInt(id, TONE_CODE)
}

export function idToBigInt(id: string, alphabet: string): bigint {
  const base = BigInt(alphabet.length)
  if (!id || base < BIG_2) {
    throw new Error('Invalid input or alphabet')
  }

  // Convert from custom base
  let value = BIG_0
  for (const char of id) {
    const digit = alphabet.indexOf(char)
    if (digit === -1) {
      throw new Error(`Invalid character: ${char}`)
    }
    value = value * base + BigInt(digit)
  }

  // Apply decryption
  return decrypt(value)
}

// // Test function
// function test() {
//   const testCases = [
//     BigInt(3131),
//     BigInt(123456789),
//     BigInt(987654321),
//     BigInt('98765432198765432'),
//     BigInt(0),
//     BigInt(Number.MAX_SAFE_INTEGER),
//     BigInt(42),
//     BigInt(255),
//     BigInt(1024),
//   ]

//   console.log('Running tests...\n')

//   for (const original of testCases) {
//     const encoded = bigintToId(original, TONE_CODE)
//     const decoded = idToBigInt(encoded, TONE_CODE)

//     console.log({
//       original: original.toString(),
//       encoded,
//       decoded: decoded.toString(),
//       matches: original === decoded,
//       encoded_length: encoded.length,
//     })
//   }
// }

// test()

export function isBigInt(value: string | number | bigint) {
  try {
    const bigint = typeof value === 'bigint' ? value : BigInt(value)
    return bigint >= BIG_0 && bigint <= BIG_MAX
  } catch (e) {
    return false
  }
}
