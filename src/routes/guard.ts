import type { Router } from 'uni-mini-router'

export function createRouterGuard(router: Router) {
  createBeforeEachGuard(router)
  createAfterEachGuard(router)
}

function createBeforeEachGuard(router: Router) {
  router.beforeEach((_to, _from, next) => {
    next()
  })
}

function createAfterEachGuard(router: Router) {
  router.afterEach((_to, _from) => {})
}
