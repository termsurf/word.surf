import { QueryResolvers } from '@termsurf/leaf/hook/usePageSettings'

export const QUERY_PARAM_RESOLVERS: QueryResolvers = {
  page: {
    from: deserializeInt,
    to: serializeInt,
  },
  size: {
    from: deserializeInt,
    to: serializeInt,
  },
  categories: {
    from: deserializeArrayOfStrings,
    to: serializeArrayOfStrings,
  },
  search: {
    from: deserializeText,
    to: serializeText,
  },
}

function deserializeInt(x?: string | null) {
  return x ? parseInt(x, 10) : undefined
}

function deserializeArrayOfStrings(x?: string | null) {
  return x?.split(',')
}

function deserializeText(x?: string | null) {
  return x?.replace(/\+/g, ' ')
}

function serializeInt(x: number) {
  return String(x)
}

function serializeArrayOfStrings(x: Array<string>) {
  return x.join(',')
}

function serializeText(x: string) {
  return x.replace(/\s+/g, '+')
}
