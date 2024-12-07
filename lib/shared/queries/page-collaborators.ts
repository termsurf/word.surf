import { z } from 'zod'

export const GetPageCollaborators = z.object({
  path: z.string(),
})

export type GetPageCollaborators = z.infer<typeof GetPageCollaborators>

export type PageCollaborator = {
  id: string
  user: {
    id: string
  }
  role: string
  page: {
    id: string
  }
}
