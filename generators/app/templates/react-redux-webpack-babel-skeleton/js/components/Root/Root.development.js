import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router5'
import App from 'components/App'

export default class Root extends Component {
  render() {
    const { store, router } = this.props

    return (
      <div>
        <Provider store={store}>
          <RouterProvider router={router}>
            <App />
          </RouterProvider>
        </Provider>
      </div>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired
}
