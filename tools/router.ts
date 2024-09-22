import React from 'react'
import Routington from 'routington'

export function buildRouter() {
  const router = Routington()
  router.get = function (
    path,
    handler: () => React.ReactNode | Promise<React.ReactNode>,
  ) {
    const node = router.define(path)[0]
    node.handle = handler
  }
  return router
}

export async function matchPath(router: Routington, path: string) {
  const match = router.match(path)

  if (!match) {
    // this is a 404
    return
  }

  const node = match.node

  return await node.handle()
}
