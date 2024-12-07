/* eslint-disable prettier/prettier */
import isArray from 'lodash/isArray'
import isObject from 'lodash/isObject'

export type RemoveNulls<T> = T extends null
  ? never
  : T extends Array<infer U>
  ? Array<RemoveNulls<U>>
  : T extends object
  ? {
      [K in keyof T as T[K] extends null ? never : K]: RemoveNulls<T[K]>
    }
  : T

export function removeNulls<T>(obj: T): RemoveNulls<T> {
  if (Array.isArray(obj)) {
    return obj.map(removeNulls) as RemoveNulls<T>
  }

  const res = {} as any

  for (const name in obj) {
    let value = obj[name] as any

    if (isArray(value)) {
      value = value.map(removeNulls)
    } else if (isObject(value)) {
      value = removeNulls(value)
    } else if (value == null) {
      value = undefined
    }

    res[name] = value
  }

  return res as RemoveNulls<T>
}

export function removeEmpties<T>(obj: T): any {
  const res = {} as any

  for (const name in obj) {
    let value = obj[name] as any

    if (isArray(value)) {
      value = value.map(removeEmpties)
    } else if (isObject(value)) {
      value = removeEmpties(value)
    } else if (typeof value === 'string' && value.trim() === '') {
      value = undefined
    } else if (value == null) {
      value = undefined
    }

    if (value != null) {
      res[name] = value
    }
  }

  return res
}

type RecursivelyReplaceNullWithUndefined<T> = T extends null
  ? undefined
  : T extends Date
  ? T
  : {
      [K in keyof T]: T[K] extends Array<infer U>
        ? Array<RecursivelyReplaceNullWithUndefined<U>>
        : RecursivelyReplaceNullWithUndefined<T[K]>
    }
