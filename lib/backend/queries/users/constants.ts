import { z } from 'zod'

export const GetUserId = z.object({
  key: z.string(),
})

export type GetUserId = z.infer<typeof GetUserId>

export const RemoveUserProvider = z.object({
  userKey: z.string(),
  providerSlug: z.string(),
})

export type RemoveUserProvider = z.infer<typeof RemoveUserProvider>

export const UpdateUser = z.object({
  userId: z.number().int(),
})

export type UpdateUser = z.infer<typeof UpdateUser>

export const DeleteUser = z.object({
  userKey: z.string(),
})

export type DeleteUser = z.infer<typeof DeleteUser>
