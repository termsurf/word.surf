import { buildMetadata } from '@termsurf/leaf/utility/metadata'
import omit from 'lodash/omit'
import Routington from 'routington'
import GlyphPage from '~/lib/frontend/components/pages/scripts/script/glyph/Page'
import CombinationsPage from '~/lib/frontend/components/pages/scripts/script/glyphs/combinations/Page'
import GlyphsPage, {
  PageLink,
} from '~/lib/frontend/components/pages/scripts/script/glyphs/Page'
import ScriptPage from '~/lib/frontend/components/pages/scripts/script/Page'
import { point } from '~/lib/shared/constants/scripts/symbols'
import { titleCase } from '../string'

export function addSymbol(
  router: Routington,
  script: string,
  data: any,
) {
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

    return {
      page: () => (
        <CombinationsPage
          scriptSlug={script}
          glyph={glyph}
          symbols={state.symbols()}
          links={links}
        />
      ),
    }
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

    return {
      page: () => (
        <GlyphPage
          scriptSlug={script}
          glyph={glyph}
          links={
            state.links
              ? (Object.values(state.links as ArrayLike<any>).map(
                  x => ({
                    ...omit(x, ['links', 'overview']),
                    symbols: x.overview ? x.overview() : x.symbols(),
                  }),
                ) as Array<PageLink>)
              : []
          }
        />
      ),
    }
  })
}

export async function addGetScript(
  router: Routington,
  script: string,
  data: object,
) {
  router.get(`/${script}`, () => ({
    metadata: () =>
      buildMetadata('WordSurf', {
        title: `${titleCase(script)} Script`,
      }),
    page: () => {
      const links = Object.values(data).map(x => ({
        ...omit(x, ['links', 'overview']),
        symbols: x.overview ? x.overview() : x.symbols(),
      })) as Array<PageLink>

      return (
        <ScriptPage
          scriptSlug={script}
          links={links}
        />
      )
    },
  }))
}

export function addGetSymbols(
  router: Routington,
  script: string,
  data?: any,
) {
  for (const slug in data) {
    const node = data[slug]
    addGetSymbolsImpl(router, script, node)
  }
}

function addGetSymbolsImpl(
  router: Routington,
  script: string,
  node: any,
) {
  if (node.links) {
    for (const key in node.links) {
      addGetSymbolsImpl(router, script, node.links[key])
    }
  }

  const links = node.links
    ? (Object.values(node.links as object).map(x => ({
        ...omit(x, ['links', 'overview']),
        symbols: x.overview ? x.overview() : x.symbols(),
      })) as Array<PageLink>)
    : []

  router.get(`/${script}/${node.slug}`, () => ({
    metadata: () =>
      buildMetadata('WordSurf', {
        title: `${titleCase(script)} ${node.name}`,
      }),
    page: () => (
      <GlyphsPage
        scriptSlug={script}
        glyphType={node.name}
        wide={node.wide}
        fontSize={node.fontSize}
        symbols={node.symbols()}
        links={links}
      />
    ),
  }))
}
