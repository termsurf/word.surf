import { DB } from '../constants/database'
import { idToBigIntTone } from './bigint'
import { idToIntTone } from './int'
import { db } from './kysely'

export const TONE_CODE = 'MNDBTKHSFVZXCWLR'

export const TONE_CODE_8_PATTERN = new RegExp(`^[${TONE_CODE}]{8}$`)
export const TONE_CODE_16_PATTERN = new RegExp(`^[${TONE_CODE}]{8}$`)

const UUID_MAP: Record<string, number | bigint> = {}
const ID_MAP: Record<string, number | bigint> = {}

export function matchToneCode8(text: string) {
  return !!text.match(TONE_CODE_8_PATTERN)
}

export function matchToneCode16(text: string) {
  return !!text.match(TONE_CODE_16_PATTERN)
}

export function convertUUIDToId(uuid: string, table: keyof DB) {
  const id = (UUID_MAP[uuid] ??= ++ID_MAP[table])
  return id
}

export function getNextId(table: keyof DB) {
  const id = ++ID_MAP[table]
  return id
}

export async function getMaxId(table: keyof DB, isBigInt = false) {
  const result = await db
    .selectFrom(table)
    .select(eb => eb.fn.max('id').as('highest_id'))
    .executeTakeFirst()

  if (isBigInt) {
    return BigInt(result?.highest_id ?? 0)
  } else {
    return Number(result?.highest_id ?? 0)
  }
}

export async function initializeId(table: keyof DB, isBigInt = false) {
  const id = await getMaxId(table, isBigInt)
  ID_MAP[table] = id
}

export async function getId(key: number | string) {
  if (typeof key === 'number') {
    return key
  } else if (key.match(/^[A-Z]{8}$/)) {
    return idToIntTone(key)
  } else {
    throw new Error('Invalid ID')
  }
}

export async function getBigId(key: bigint | string) {
  if (typeof key === 'bigint') {
    return String(key)
  } else if (key.match(/^[A-Z]{16}$/)) {
    return String(idToBigIntTone(key))
  } else {
    throw new Error('Invalid ID')
  }
}
