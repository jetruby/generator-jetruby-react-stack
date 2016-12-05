import { createStore, applyMiddleware, compose } from 'redux'
import createLogger from 'redux-logger'
import createRootReducer from 'reducers'
import sagaMiddleware from 'middlewares/sagaMiddleware'
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'
import { persistState } from 'redux-devtools'
import DevTools from 'containers/DevTools'


export default function configureStore({ history, apolloClient }, initialState) {
  const loggerMiddleware = createLogger({ duration: true })
  const apolloMiddleware = apolloClient.middleware()

  if (process.env.APP_ENV === 'development') {
    const persistSession = typeof window !== 'undefined' ? window.location.href.match(/[?&]debug_session=([^&#]+)\b/) : null

    const enhancer = compose(
      applyMiddleware(
        apolloMiddleware,
        loggerMiddleware,
        routerMiddleware(history),
        sagaMiddleware
      ),
      DevTools.instrument(),
      persistState(persistSession)
    )

    const store = createStore(createRootReducer(apolloClient), initialState, enhancer)

    return store
  }

  const finalCreateStore = compose(
    applyMiddleware(
      loggerMiddleware,
      routerMiddleware(history),
      sagaMiddleware
    )
  )(createStore)

  return finalCreateStore(createRootReducer(apolloClient), initialState)
}
