import { createStore, applyMiddleware, compose } from 'redux'
import createLogger from 'redux-logger'
import rootReducer from 'reducers'
import sagaMiddleware from 'middlewares/sagaMiddleware'
import { routerMiddleware } from 'react-router-redux'

export default function configureStore({ history }, initialState) {
  const loggerMiddleware = createLogger({ duration: true })

  const finalCreateStore = compose(
    applyMiddleware(
      loggerMiddleware,
      routerMiddleware(history),
      sagaMiddleware
    )
  )(createStore)

  return finalCreateStore(rootReducer, initialState)
}

