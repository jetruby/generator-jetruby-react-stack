import 'isomorphic-fetch'
import path                                          from 'path'
import http                                          from 'http'
import express                                       from 'express'
import cookieParser                                  from 'cookie-parser'
import serialize                                     from 'serialize-javascript'
import util                                          from 'util'

import React                                         from 'react'
import { createMemoryHistory, match, RouterContext } from 'react-router'
import { renderToString }                            from 'react-dom/server'
import { Provider }                                  from 'react-redux'
import { configureRoutes }                           from 'src/routes'
import configureStore                                from 'store/configureStore.js'
import { syncHistoryWithStore }                      from 'react-router-redux'
import sagaMiddleware                                from 'middlewares/sagaMiddleware'
import rootSaga                                      from 'sagas'
import { END }                                       from 'redux-saga'
import config                                        from 'constants/config'


const HTML = ({ content, store, jsBuildPath, cssBuildPath }) => (
  <html lang="en">
    <head>
      <title>App!</title>
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="" />
      <meta name="author" content="" />
      <link href={`${config.CLIENT_HOST}/${cssBuildPath}`} rel="stylesheet" />
    </head>
    <body>
      <div id="app" dangerouslySetInnerHTML={{ __html: content }} />
      <script dangerouslySetInnerHTML={{ __html: `window.__initialState__=${serialize(store.getState())};` }} />
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
  app.use(cookieParser())

  app.use((req, res) => {
    const memoryHistory = createMemoryHistory(req.url)

    const storeInitialState = {
      currentUser: {
        isLoggedIn: !!req.cookies.token // We might need something more clever than checking the token presence.
      }
    }

    const store = configureStore({
      history: memoryHistory
    }, storeInitialState)

    const history = syncHistoryWithStore(memoryHistory, store)

    match({ history, routes: configureRoutes(store), location: req.url }, (error, redirectLocation, renderProps) => {
      if (error) {
        res.status(500).send(error.message)
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search)
      } else if (renderProps) {
        const RootComponent = (
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        )
        const rootTask = sagaMiddleware.run(rootSaga)

        // Rendering TWICE, refer to https://github.com/yelouafi/redux-saga/issues/354
        renderToString(RootComponent)
        store.dispatch(END)

        rootTask.done.then(() => {
          const content = renderToString(RootComponent)

          const raw = renderToString(
            <HTML
              content={content}
              store={store}
              jsBuildPath={jsBuildPath}
              cssBuildPath={cssBuildPath}
            />
          )

          res.status(200)
          res.send(`<!doctype html>\n${raw}`)
          res.end()
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
