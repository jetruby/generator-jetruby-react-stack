import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from 'containers/App'
import HomePage from 'pages/HomePage'
import About from 'pages/About'

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/about" component={About} />
  </Route>
)

export default routes
