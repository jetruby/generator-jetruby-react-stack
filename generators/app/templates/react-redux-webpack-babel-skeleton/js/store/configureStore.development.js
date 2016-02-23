import { createStore, applyMiddleware, compose } from 'redux'
import createLogger from 'redux-logger'
import rootReducer from 'reducers'
import { router5Middleware } from 'redux-router5'
import sagaMiddleware from 'redux-saga'
import rootSaga from 'sagas'

export default function configureStore(router, initialState) {
  const loggerMiddleware = createLogger({ duration: true })

  const finalCreateStore = compose(
    applyMiddleware(
      loggerMiddleware,
      sagaMiddleware(rootSaga),
      router5Middleware(router)
    )
    // devTools()
  )(createStore)

  return finalCreateStore(rootReducer, initialState)
}
