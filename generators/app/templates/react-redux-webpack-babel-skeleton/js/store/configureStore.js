import { createStore, applyMiddleware, compose } from 'redux'
import createLogger from 'redux-logger'
import rootReducer from 'reducers'
import sagaMiddleware from 'middlewares/sagaMiddleware'
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'
import { persistState } from 'redux-devtools'
import DevTools from 'containers/DevTools'

export default function configureStore({ history }, initialState) {
  const loggerMiddleware = createLogger({ duration: true })

  if (process.env.APP_ENV === 'development') {
    const persistSession = typeof window !== 'undefined' ? window.location.href.match(/[?&]debug_session=([^&#]+)\b/) : null

    const enhancer = compose(
      applyMiddleware(
        loggerMiddleware,
        routerMiddleware(history),
        sagaMiddleware
      ),
      DevTools.instrument(),
      persistState(persistSession)
    )

    const store = createStore(rootReducer, initialState, enhancer)

    if (module.hot) {
      module.hot.accept('../reducers', () =>
        store.replaceReducer(rootReducer)
      )
    }

    return store
  }

  const finalCreateStore = compose(
    applyMiddleware(
      loggerMiddleware,
      routerMiddleware(history),
      sagaMiddleware
    )
  )(createStore)

  return finalCreateStore(rootReducer, initialState)
}
