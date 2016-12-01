import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from 'containers/App'
import HomePage from 'pages/HomePage'
import About from 'pages/About'
import Login from 'pages/Login'
import UserProfile from 'pages/UserProfile'


export const configureRoutes = (store) => {
  const ifUserLoggedIn = (nextState, replace, callback) => {
    const currentUser = store.getState().currentUser

    if (!currentUser.isLoggedIn) {
      replace('/login')
    }

    callback()
  }

  const ifUserNotLoggedIn = (nextState, replace, callback) => {
    const currentUser = store.getState().currentUser

    if (currentUser.isLoggedIn) {
      replace('/profile')
    }

    callback()
  }

  return (
    <Route path="/" component={App}>
      <IndexRoute component={HomePage} />
      <Route path="/about" component={About} />
      <Route path="/login" component={Login} onEnter={ifUserNotLoggedIn} />
      <Route path="/profile" component={UserProfile} onEnter={ifUserLoggedIn} />
    </Route>
  )
}