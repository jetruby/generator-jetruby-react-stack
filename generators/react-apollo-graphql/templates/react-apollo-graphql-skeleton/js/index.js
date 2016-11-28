import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory, hashHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import rootSaga from 'sagas'
import sagaMiddleware from 'middlewares/sagaMiddleware'
import { ApolloProvider } from 'react-apollo'
import { client } from 'apollo'
import configureStore from 'store/configureStore'
import routes from 'src/routes'


const store = configureStore({
  history: browserHistory,
  apolloClient: client
}, window.__initialState__)

const history = syncHistoryWithStore(browserHistory, store)
window.Store = store

sagaMiddleware.run(rootSaga)

render(
  <ApolloProvider store={store} client={client}>
    <Router history={history} routes={routes} />
  </ApolloProvider>,
  document.getElementById('app')
)
