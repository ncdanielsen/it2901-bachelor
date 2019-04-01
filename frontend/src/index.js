import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import "./index.css"
import * as serviceWorker from './serviceWorker'

import { Provider } from 'react-redux'
import configureStore from './store/configureStore'

const store = configureStore() // create the redux store

// this is the starting point for the react application
// the Provider component is only necessary for redux, and does not produce any actual html
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') // check out public/index.html for details about the static template
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister() // optional, check out serviceWorker.js for more details
