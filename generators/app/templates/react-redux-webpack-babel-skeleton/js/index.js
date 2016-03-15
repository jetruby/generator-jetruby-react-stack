import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import configureStore from 'store/configureStore'
import createRouter from 'router/createRouter'
import Root from 'components/Root'

const router = createRouter()
const store = configureStore(router)

router.start((err, state) => {
  render(
    <Root store={store} router={router} />,
    document.getElementById('app')
  )
})
