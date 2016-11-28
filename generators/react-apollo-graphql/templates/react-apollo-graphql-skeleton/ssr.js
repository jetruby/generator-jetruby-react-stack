import 'isomorphic-fetch'
import path from 'path'
import http from 'http'
import express from 'express'
import serialize from 'serialize-javascript'
import util from 'util'

import React                                         from 'react'
import { createMemoryHistory, match, RouterContext } from 'react-router'
import { renderToString }                            from 'react-dom/server'
import { Provider }                                  from 'react-redux'
import routes                                        from 'src/routes'
import configureStore                                from 'store/configureStore.js'
import { syncHistoryWithStore }                      from 'react-router-redux'
import sagaMiddleware                                from 'middlewares/sagaMiddleware'
import rootSaga                                      from 'sagas'
import { END }                                       from 'redux-saga'
import config                                        from 'constants/config'

import ApolloClient, { createNetworkInterface }      from 'apollo-client'
import { ApolloProvider }                            from 'react-apollo'
import { getDataFromTree }                           from 'react-apollo/server'

const HTML = ({ content, store, apolloInitialState, jsBuildPath, cssBuildPath }) => (
  <html lang="en">
    <head>
      <link href={`${config.CLIENT_HOST}/${cssBuildPath}`} rel="stylesheet" />
    </head>
    <body>
      <div id="app" dangerouslySetInnerHTML={{ __html: content }} />
      <script dangerouslySetInnerHTML={{ __html: `window.__initialState__=${serialize(store.getState())};` }} />
      <script dangerouslySetInnerHTML={{ __html: `window.__APOLLO_STATE__=${serialize(apolloInitialState)};` }} />
      <script src={`${config.CLIENT_HOST}/${jsBuildPath}`} />
    </body>
  </html>
)
const PORT = 3000

// The server code must export a function
// (`parameters` may contain some miscellaneous library-specific stuff)
export default function (parameters) {
  const jsBuildPath = parameters.chunks().javascript.main
  const cssBuildPath = parameters.chunks().styles.main

  // Create HTTP server
  const app = new express()
  const server = new http.Server(app)

  app.use(express.static('dist'))
  app.use(express.static('public'))

  app.use((req, res) => {
    const networkInterface = createNetworkInterface({
      uri: config.API_HOST,
      credentials: 'same-origin',
      headers: req.headers
    })

    // networkInterface.use([{
    //   applyMiddleware(req, next) {
    //     console.log(util.inspect(req, false, null))
    //     next()
    //   }
    // }])

    const client = new ApolloClient({
      ssrMode: true,
      networkInterface
    })

    const memoryHistory = createMemoryHistory(req.url)

    const store = configureStore({
      history: memoryHistory,
      apolloClient: client
    })

    const history = syncHistoryWithStore(memoryHistory, store)

    match({ history, routes, location: req.url }, (error, redirectLocation, renderProps) => {
      if (error) {
        res.status(500).send(error.message)
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search)
      } else if (renderProps) {
        const RootComponent = (
          <ApolloProvider store={store} client={client}>
            <RouterContext {...renderProps} />
          </ApolloProvider>
        )
        const rootTask = sagaMiddleware.run(rootSaga)

        // There are actually 2 stores bound to context
        // context.store - app redux store
        // context.client.store - redux store from apollo
        //
        // We need to use context.client.store to prepopulate apollo initial state on the client
        // See https://github.com/apollostack/react-apollo/issues/210

        // Rendering TWICE, refer to https://github.com/yelouafi/redux-saga/issues/354
        renderToString(RootComponent)
        store.dispatch(END)

        rootTask.done.then(() => {
          getDataFromTree(RootComponent).then(() => {
            const content = renderToString(RootComponent)
            const raw = renderToString(
              <HTML
                content={content}
                store={store}
                apolloInitialState={{ apollo: { data: store ? store.getState().apollo.data : {} } }}
                jsBuildPath={jsBuildPath}
                cssBuildPath={cssBuildPath}
              />
            )

            res.status(200)
            res.send(`<!doctype html>\n${raw}`)
            res.end()
          }).catch((error) => res.status(500).send(error.message))
        }).catch((error) => res.status(500).send(error.message))
      } else {
        res.status(404).send('Not Found.')
      }
    })
  })

  // Start the HTTP server
  server.listen(PORT, function () {
    console.log(`Server listening on http://localhost:${PORT}, Ctrl+C to stop`)
  })
}
