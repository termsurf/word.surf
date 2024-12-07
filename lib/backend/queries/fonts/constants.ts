import { z } from 'zod'
import { pagination } from '~/lib/shared/utilities/schema'

export const ListFonts = z.object({
  ...pagination(),
  slugs: z.array(z.string()).optional(),
})

export type ListFonts = z.infer<typeof ListFonts>

export const ListFontsBySlugs = z.object({
  ...pagination(),
  slugs: z.array(z.string()),
})

export type ListFontsBySlugs = z.infer<typeof ListFontsBySlugs>

export const ListFontsGlobally = z.object({
  ...pagination(),
})

export type ListFontsGlobally = z.infer<typeof ListFontsGlobally>

export const FORMAT = {
  otf: 'otf',
  ttf: 'ttf',
}

export const MIME = {
  otf: 'font/otf',
  ttf: 'font/ttf',
}

export const UploadFont = z.object({
  family: z.string(),
  slug: z.string(),
  test: z.optional(z.string()),
  styles: z.array(
    z.object({
      path: z.string(),
      weight: z.optional(z.number().int()),
      italic: z.optional(z.boolean()),
    }),
  ),
})

export type UploadFont = z.infer<typeof UploadFont>
