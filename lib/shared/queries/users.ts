import { z } from 'zod'
import { List } from '../constants'
import { pagination } from '../utilities/schema'
import { LanguageCollaborator } from './language-collaborators'
import { PageCollaborator } from './page-collaborators'
import { ScriptCollaborator } from './script-collaborators'

export const GetUsers = z.object({
  ...pagination(),
})

export type GetUsers = z.infer<typeof GetUsers>

export type GetUsersResponse = {
  users: List<User>
}

export type GetUsersQueryParams = {
  slug: string
}

export const GetUserProfile = z.object({
  slug: z.string(),
})

export type GetUserProfile = z.infer<typeof GetUserProfile>

export type GetUserProfileResponse = {
  id: string
  users: List<User>
  collaborations: List<
    PageCollaborator | LanguageCollaborator | ScriptCollaborator
  >
}

export type User = {
  id: string
  name: string
  slug: string
  description?: string
  created_at: string
}
