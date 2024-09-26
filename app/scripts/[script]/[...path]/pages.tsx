import omit from 'lodash/omit'
import GlyphPage from '~/components/pages/scripts/script/glyph/Page'
import CombinationsPage from '~/components/pages/scripts/script/glyphs/combinations/Page'
import GlyphsPage, {
  PageLink,
} from '~/components/pages/scripts/script/glyphs/Page'
import ScriptPage from '~/components/pages/scripts/script/Page'
import { point, sets, symbols } from '~/data/scripts/symbols'
import { buildRouter, matchPath } from '~/tools/router'

const router = buildRouter()

for (const script in sets) {
  const state = sets[script]

  addScript(script, state)

  for (const key in state) {
    addSymbols(script, state[key])
  }
}

for (const script in symbols) {
  const state = symbols[script]

  addSymbol(script, state)
}

function addSymbol(script: string, data: any) {
  router.get(`/${script}/:code/combinations`, async (params: any) => {
    const something = decodeURIComponent(params.code as string).replace(
      /\s+/g,
      '+',
    )

    const code = something.match(/^U\+/) ? something : point(something)

    const state = data[code].links.combinations

    if (!state) {
      return
    }

    const glyph = String.fromCodePoint(parseInt(code.split('+')[1], 16))

    const links = state.links
      ? (Object.values(state.links as ArrayLike<any>).map(x => ({
          ...omit(x, ['links', 'overview']),
          symbols: x.overview ? x.overview() : x.symbols(),
        })) as Array<PageLink>)
      : []
    return (
      <CombinationsPage
        scriptSlug={script}
        glyph={glyph}
        symbols={state.symbols()}
        links={links}
      />
    )
  })

  router.get(`/${script}/:code`, async (params: any) => {
    const something = decodeURIComponent(params.code as string).replace(
      /\s+/g,
      '+',
    )

    const code = something.match(/^U\+/) ? something : point(something)

    const state = data[code]

    if (!state) {
      return
    }

    const glyph = String.fromCodePoint(parseInt(code.split('+')[1], 16))

    return (
      <GlyphPage
        scriptSlug={script}
        glyph={glyph}
        links={
          state.links
            ? (Object.values(state.links as ArrayLike<any>).map(x => ({
                ...omit(x, ['links', 'overview']),
                symbols: x.overview ? x.overview() : x.symbols(),
              })) as Array<PageLink>)
            : []
        }
      />
    )
  })
}

function addScript(script: string, data: any) {
  router.get(`/${script}`, () => {
    return (
      <ScriptPage
        scriptSlug={script}
        links={
          Object.values(data as ArrayLike<any>).map(x => ({
            ...omit(x, ['links', 'overview']),
            symbols: x.overview ? x.overview() : x.symbols(),
          })) as Array<PageLink>
        }
      />
    )
  })
}

function addSymbols(script: string, data: any) {
  const links = data.links
    ? (Object.values(data.links as ArrayLike<any>).map(x => ({
        ...omit(x, ['links', 'overview']),
        symbols: x.overview ? x.overview() : x.symbols(),
      })) as Array<PageLink>)
    : []

  router.get(`/${script}/${data.slug}`, async () => {
    return (
      <GlyphsPage
        scriptSlug={script}
        glyphType={data.name}
        wide={data.wide}
        fontSize={data.fontSize}
        symbols={data.symbols()}
        links={links}
      />
    )
  })

  if (data.links) {
    for (const key in data.links) {
      addSymbols(script, data.links[key])
    }
  }
}

export default function render(path: string) {
  return matchPath(router, path)
}
