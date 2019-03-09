import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import graphReducer from './graphReducer'
import serverReducer from './serverReducer'


// combine all reducers to one, take in history as argument for connecting it to react-router
const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  graphReducer,
  serverReducer
})

export default createRootReducer
