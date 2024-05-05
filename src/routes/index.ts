import type { App } from 'vue'
import { createRouter } from 'uni-mini-router'
import pagesJsonToRoutes from 'uni-parse-pages'
import pagesJson from '../pages.json'
import { createRouterGuard } from './guard'

const routes = pagesJsonToRoutes(pagesJson)
const router = createRouter({
  routes: [...routes],
})

export function setupRouter(app: App<Element>) {
  createRouterGuard(router)
  app.use(router)
}

export { router }
