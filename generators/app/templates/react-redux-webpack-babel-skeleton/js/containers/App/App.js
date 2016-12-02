import React, { Component } from 'react'
import DevTools from 'containers/DevTools'
import Nav from 'components/Nav'

class App extends Component {
  render() {
    return (
      <div>
        <Nav />

        { this.props.children }

        {
          process.env.APP_ENV === 'development'
          ? <DevTools />
          : ''
        }
      </div>
    )
  }
}

export default App
