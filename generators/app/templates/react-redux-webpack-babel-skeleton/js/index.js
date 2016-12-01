import 'babel-core/register'
import 'babel-polyfill'

import React from 'react'
import { render } from 'react-dom'
import configureStore from 'store/configureStore'
import { Router, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import sagaMiddleware from 'middlewares/sagaMiddleware'
import rootSaga from 'sagas'
import { configureRoutes } from 'src/routes'

import 'normalize.css'
import 'styles/global.css'

const store = configureStore({ history: browserHistory }, window.__initialState__)

const history = syncHistoryWithStore(browserHistory, store)
window.Store = store

sagaMiddleware.run(rootSaga)

render(
  <Provider store={store}>
    <Router history={history} routes={configureRoutes(store)} />
  </Provider>,
  document.getElementById('app')
)
