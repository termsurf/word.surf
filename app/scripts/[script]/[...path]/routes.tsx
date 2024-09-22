import omit from 'lodash/omit'
import GlyphsPage, {
  PageLink,
} from '~/components/pages/scripts/script/glyphs/Page'
import ScriptPage from '~/components/pages/scripts/script/Page'
import { buildRouter, matchPath } from '~/tools/router'

const router = buildRouter()

router.get(`/tibetan/consonants`, async () => {
  const { consonants } = await import('@termsurf/text/tibetan')
  return (
    <GlyphsPage
      scriptSlug="tibetan"
      glyphType="vowels"
      symbols={Object.keys(consonants)}
    />
  )
})

router.get(`/latin`, async () => {
  const symbols = (await import('~/data/scripts/symbols')).default
  return (
    <ScriptPage
      scriptSlug="latin"
      links={
        Object.values(symbols.latin).map(x => ({
          ...omit(x, ['links']),
          symbols: x.symbols(),
        })) as Array<PageLink>
      }
    />
  )
})

router.get(`/latin/letters`, async () => {
  const symbols = (await import('~/data/scripts/symbols')).default
  return (
    <GlyphsPage
      scriptSlug="latin"
      glyphType="letters"
      symbols={symbols.latin.letters.symbols()}
      links={
        Object.values(symbols.latin.letters.links).map(x => ({
          ...omit(x, ['links']),
          symbols: x.symbols(),
        })) as Array<PageLink>
      }
    />
  )
})

router.get(`/latin/numbers`, async () => {
  const symbols = (await import('~/data/scripts/symbols')).default
  return (
    <GlyphsPage
      scriptSlug="latin"
      glyphType="numbers"
      symbols={symbols.latin.numbers.symbols()}
      links={
        Object.values(symbols.latin.numbers.links).map(x => ({
          ...omit(x, ['links']),
          symbols: x.symbols(),
        })) as Array<PageLink>
      }
    />
  )
})

router.get(`/latin/letters/consonants`, async () => {
  const symbols = (await import('~/data/scripts/symbols')).default
  return (
    <GlyphsPage
      scriptSlug="latin"
      glyphType="consonants"
      symbols={symbols.latin.letters.links.consonants.symbols()}
      links={
        Object.values(symbols.latin.letters.links.consonants.links).map(
          x => ({
            ...omit(x, ['links']),
            symbols: x.symbols(),
          }),
        ) as Array<PageLink>
      }
    />
  )
})

export default function render(path: string) {
  return matchPath(router, path)
}
