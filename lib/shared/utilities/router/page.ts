import { Metadata } from 'next'
import React from 'react'
import Routington from 'routington'

export type Params = Record<string, string>

export type RouterPageGet = (params: Params) => {
  metadata?: () => Metadata | Promise<Metadata>
  page: () => React.ReactNode | Promise<React.ReactNode>
}

export function buildRouter() {
  const router = Routington()
  router.get = (path: string, handler: RouterPageGet) => {
    const node = router.define(path)[0]
    node.handle = handler
  }
  return router
}

export function matchPagePath(router: Routington, path: string) {
  const match = router.match(path)

  if (!match) {
    // this is a 404
    return
  }

  const node = match.node

  if (!node?.handle) {
    return
  }

  const handle = node.handle as RouterPageGet

  return handle((match.param ?? {}) as Params)
}
