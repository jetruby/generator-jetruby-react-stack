import 'babel-core/register'
import 'babel-polyfill'

import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory, hashHistory } from 'react-router'
import { ApolloProvider } from 'react-apollo'
import { syncHistoryWithStore } from 'react-router-redux'
import sagaMiddleware from 'middlewares/sagaMiddleware'
import rootSaga from 'sagas'
import { client } from 'apollo'
import configureStore from 'store/configureStore'
import { configureRoutes } from 'src/routes'

import 'normalize.css'
import 'styles/global.css'

const store = configureStore({
  history: browserHistory,
  apolloClient: client
}, window.__initialState__)

const history = syncHistoryWithStore(browserHistory, store)
window.Store = store

sagaMiddleware.run(rootSaga)

render(
  <ApolloProvider store={store} client={client}>
    <Router history={history} routes={configureRoutes(store)} />
  </ApolloProvider>,
  document.getElementById('app')
)
