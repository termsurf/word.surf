import z from 'zod'
import { paginationProps } from '~/lib/shared/queries'
import { List } from '../constants'

export const GetScripts = z.object({
  ...paginationProps(),
  categories: z.array(z.string()),
})

export type GetScripts = z.infer<typeof GetScripts>

export type GetScriptsResponse = {
  scripts: List<AbbreviatedScript>
}

export const GetScript = z.object({
  slug: z.string(),
})

export type GetScript = z.infer<typeof GetScript>

export type GetScriptResponse = {
  id: string
  scripts: List<AbbreviatedScript>
}

export type GetScriptQueryParams = {
  scriptSlug: string
}

export type AbbreviatedScript = {
  id: string
  slug: string
  name: string
}
