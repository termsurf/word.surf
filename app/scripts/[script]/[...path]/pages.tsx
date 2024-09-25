import omit from 'lodash/omit'
import GlyphsPage, {
  PageLink,
} from '~/components/pages/scripts/script/glyphs/Page'
import ScriptPage from '~/components/pages/scripts/script/Page'
import { sets, symbols } from '~/data/scripts/symbols'
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
  router.get(`/${script}/:code`, async (params: any) => {
    const state = data[params.code]
    return (
      <ScriptPage
        scriptSlug={script}
        links={
          Object.values(state.links as ArrayLike<any>).map(x => ({
            ...omit(x, ['links', 'overview']),
            symbols: x.overview ? x.overview() : x.symbols(),
          })) as Array<PageLink>
        }
      />
    )
  })

  router.get(`/${script}/:code/bindings`, async (params: any) => {
    console.log('data', data)
    console.log('params.code', params.code)
    const state = data[params.code].links.bindings
    const links = state.links
      ? (Object.values(state.links as ArrayLike<any>).map(x => ({
          ...omit(x, ['links', 'overview']),
          symbols: x.overview ? x.overview() : x.symbols(),
        })) as Array<PageLink>)
      : []
    return (
      <GlyphsPage
        scriptSlug={script}
        glyphType={state.name}
        symbols={state.symbols()}
        links={links}
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
