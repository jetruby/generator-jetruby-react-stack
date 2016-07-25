import { Router5 } from 'router5'
import historyPlugin from 'router5-history'
import listenersPlugin from 'router5-listeners'
import { isLoggedIn, isNotLoggedIn } from 'router/helpers'

export default function createRouter(routes) {
  const router = new Router5()
    .setOption('useHash', true)
    // .setOption('hashPrefix', '!')
    .setOption('defaultRoute', 'dashboard')

    // Routes
    .addNode('dashboard', '/dashboard')

    // Plugins
    .usePlugin(historyPlugin())
    .usePlugin(listenersPlugin())

  return router
}
