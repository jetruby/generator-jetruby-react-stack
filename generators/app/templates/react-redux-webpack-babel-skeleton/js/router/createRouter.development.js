import Router5 from 'router5'
import historyPlugin from 'router5-history'

export default function createRouter() {
  const router = new Router5()
    .setOption('useHash', true)
    // .setOption('hashPrefix', '!')
    .setOption('defaultRoute', 'dashboard')

    // Routes
    .addNode('dashboard', '/dashboard')
    .addNode('profile', '/profile')

    // Plugins
    .usePlugin(historyPlugin())

  return router
}
