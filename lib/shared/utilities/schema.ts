import { z } from 'zod'

export const pagination = () => ({
  size: z.number().int().default(100),
  page: z.number().int().min(1).max(1000).default(1),
})
