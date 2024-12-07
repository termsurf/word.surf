'use client'
import Provider from '@termsurf/leaf/component/provider'

import {
  Base,
  QueryResolvers,
} from '@termsurf/leaf/hook/usePageSettings'
import { useLayoutEffect } from 'react'
import { mappings } from '~/lib/frontend/queries'
import store, { Queries } from '~/lib/frontend/services/redux'
import { FONT, SCRIPT } from '~/lib/shared/constants/fonts'

const settings = { fonts: FONT, scripts: SCRIPT }

export default function Environment({
  children,
  initializers,
  path,
  cached,
  base,
  queryResolvers,
}: {
  children: React.ReactNode
  initializers?: Queries
  cached?: Base
  base?: Base
  path?: string
  queryResolvers?: QueryResolvers
}) {
  useLayoutEffect(() => {
    if (initializers) {
      for (const queryKey in initializers) {
        const state = initializers[queryKey]
        const mapping = mappings[queryKey]

        if (state && mapping) {
          store.dispatch(
            mapping.util.upsertQueryData(queryKey, undefined, state),
          )
        }
      }
    }
  }, [initializers])

  return (
    <Provider
      store={store}
      settings={settings}
      base={base}
      cached={cached}
      path={path}
      queryResolvers={queryResolvers}
    >
      {children}
    </Provider>
  )
}
