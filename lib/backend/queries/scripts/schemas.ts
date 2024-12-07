import { z } from 'zod'
import { pagination } from '~/lib/shared/utilities/schema'

export const ListScripts = z.object({
  categories: z.union([z.string(), z.array(z.string())]).optional(),
  ...pagination(),
})

export type ListScripts = z.infer<typeof ListScripts>

export const FindScript = z.object({
  slug: z.string().optional(),
  id: z.string().optional(),
})

export type FindScript = z.infer<typeof FindScript>
