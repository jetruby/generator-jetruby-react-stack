import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import configureStore from 'store/configureStore'
import createRouter from 'router/createRouter'
import Root from 'components/Root'

const router = createRouter()

router.start((err, state) => {
  const store = configureStore(router, { router: { route: state } })

  render(
    <Root store={store} router={router} />,
    document.getElementById('app')
  )
})
