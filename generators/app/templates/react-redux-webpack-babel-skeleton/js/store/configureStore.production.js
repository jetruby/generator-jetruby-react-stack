import { createStore, applyMiddleware, compose } from 'redux'
import createLogger from 'redux-logger'
import rootReducer from 'reducers'
import { router5Middleware } from 'redux-router5'
import sagaMiddleware from 'middlewares/sagaMiddleware'

export default function configureStore(router, initialState) {
  const loggerMiddleware = createLogger({ duration: true })

  const finalCreateStore = compose(
    applyMiddleware(
      router5Middleware(router),
      sagaMiddleware
    )
  )(createStore)

  return finalCreateStore(rootReducer, initialState)
}
