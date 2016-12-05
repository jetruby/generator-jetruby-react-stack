import { createStore, applyMiddleware, compose } from 'redux'
import createLogger from 'redux-logger'
import createRootReducer from 'reducers'
import sagaMiddleware from 'middlewares/sagaMiddleware'
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'

export default function configureStore({ history, apolloClient }, initialState) {
  const loggerMiddleware = createLogger({ duration: true })

  const finalCreateStore = compose(
    applyMiddleware(
      loggerMiddleware,
      routerMiddleware(history),
      sagaMiddleware
    )
  )(createStore)

  return finalCreateStore(createRootReducer(apolloClient), initialState)
}
