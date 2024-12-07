import { TONE_CODE } from './id'

// Constants for 32-bit integer arithmetic
const INT_0 = 0
const INT_MAX = 0x7fffffff // 2147483647
const KEY = 0xdeadbeef >>> 0
const ROUNDS = 4
const ID_LENGTH = 8 // Changed from 16 to 8

// Use 16 bits for each half
const HALF_BITS = 16
const HALF_MASK = 0xffff
const UINT_MAX = 0xffffffff

function mul32(a: number, b: number): number {
  return ((a & 0xffff) * (b & 0xffff)) >>> 0
}

function feistelRound(
  left: number,
  right: number,
  key: number,
  round: number,
): [number, number] {
  const f = (mul32(right, key) + round) & HALF_MASK
  const newRight = (left ^ f) & HALF_MASK
  return [right, newRight]
}

function encrypt(value: number): number {
  let left = (value >>> HALF_BITS) & HALF_MASK
  let right = value & HALF_MASK

  for (let round = 0; round < ROUNDS; round++) {
    const roundKey = (KEY + round) >>> 0
    ;[left, right] = feistelRound(left, right, roundKey, round)
  }

  return ((left << HALF_BITS) | right) >>> 0
}

function decrypt(value: number): number {
  let left = (value >>> HALF_BITS) & HALF_MASK
  let right = value & HALF_MASK

  for (let round = ROUNDS - 1; round >= 0; round--) {
    const roundKey = (KEY + round) >>> 0
    ;[right, left] = feistelRound(right, left, roundKey, round)
  }

  return ((left << HALF_BITS) | right) >>> 0
}

export function intToIdTone(value: number): string {
  return intToId(value, TONE_CODE)
}

export function intToId(value: number, alphabet: string): string {
  if (!Number.isInteger(value) || value < 0 || value > INT_MAX) {
    throw new Error(
      'Value must be a positive integer within 31-bit range',
    )
  }

  const base = alphabet.length
  if (base < 2) {
    throw new Error('Alphabet must contain at least 2 characters')
  }

  // Apply encryption
  const encrypted = encrypt(value) >>> 0

  if (encrypted === 0) {
    return alphabet[0].repeat(ID_LENGTH)
  }

  // Convert to custom base
  const digits: Array<number> = []
  let temp = encrypted

  do {
    const remainder = temp % base
    digits.push(remainder)
    temp = Math.floor(temp / base)
  } while (temp > 0)

  // Build result string
  return digits
    .reverse()
    .map(i => alphabet[i])
    .join('')
    .padStart(ID_LENGTH, alphabet[0])
}

export function idToIntTone(id: string): number {
  return idToInt(id, TONE_CODE)
}

export function idToInt(id: string, alphabet: string): number {
  const base = alphabet.length
  if (!id || base < 2) {
    throw new Error('Invalid input or alphabet')
  }

  // Convert from custom base
  let value = 0
  for (const char of id) {
    const digit = alphabet.indexOf(char)
    if (digit === -1) {
      throw new Error(`Invalid character: ${char}`)
    }
    // Safe multiplication check
    if (value > (UINT_MAX - digit) / base) {
      throw new Error('Value exceeds maximum safe integer')
    }
    value = value * base + digit
  }

  // Apply decryption
  const decrypted = decrypt(value) >>> 0
  if (decrypted > INT_MAX) {
    throw new Error('Decrypted value exceeds maximum safe integer')
  }

  return decrypted
}

export function isValidInt(value: string | number): boolean {
  try {
    const num = typeof value === 'number' ? value : parseInt(value, 10)
    return Number.isInteger(num) && num >= 0 && num <= INT_MAX
  } catch {
    return false
  }
}

// // Test function
// function test() {
//   const testCases = [
//     0,
//     1,
//     42,
//     255,
//     1024,
//     3131,
//     123456,
//     987654,
//     16777215,
//     INT_MAX >>> 1,
//     INT_MAX,
//   ]

//   console.log('Running tests...\n')

//   for (const original of testCases) {
//     const encoded = intToId(original, TONE_CODE)
//     const decoded = idToInt(encoded, TONE_CODE)

//     console.log({
//       original,
//       encoded,
//       decoded,
//       matches: original === decoded,
//       encoded_length: encoded.length,
//       hex: original.toString(16).padStart(8, '0'),
//     })
//   }
// }

// test()

export function isInt(value: string | number) {
  try {
    const int = typeof value === 'number' ? value : Number(value)
    return int >= INT_0 && int <= INT_MAX
  } catch (e) {
    return false
  }
}
