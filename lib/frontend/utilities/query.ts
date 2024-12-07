import { TagType } from '~/lib/frontend/constants/tags'
import { Response } from '~/lib/shared/queries'

export function transformResponse(response: Response) {
  if (response.type === 'success') {
    return response.data
  }

  throw new Error(response.message)
}

export function query(
  path: string,
  search?: Record<string, any> | void,
) {
  const keys = Object.keys(search || {})
  if (search && keys.length) {
    const params = new URLSearchParams()
    for (const key of keys) {
      const value = search[key]

      if (Array.isArray(value)) {
        params.set(key, value.join(','))
      } else if (value != null) {
        params.set(key, String(value).replace(/\s+/g, '+'))
      }
    }
    return `${path}?${params}`
  }
  return path
}

export type TagBuilder = (value: string) => {
  type: TagType
  id: string
}

export function array(
  value: Array<string> | void | undefined,
  builder: TagBuilder,
) {
  return value ? value.map(builder) : []
}

export type TagsBuilder = (params: any) => Array<{
  type: TagType
  id: string
}>

export function tags(builder: TagsBuilder) {
  return (r, e, params): ReturnType<TagsBuilder> => builder(params)
}
