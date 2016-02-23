import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from 'reducers'
import thunkMiddleware from 'redux-thunk'
import { router5Middleware } from 'redux-router5'
import rootSaga from 'sagas'
import sagaMiddleware from 'redux-saga'

export default function configureStore(router, initialState) {
  const finalCreateStore = compose(
    applyMiddleware(
      sagaMiddleware(rootSaga),
      router5Middleware(router)
    )
  )(createStore)

  return finalCreateStore(rootReducer, initialState)
}
