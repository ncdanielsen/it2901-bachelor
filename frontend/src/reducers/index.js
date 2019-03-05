import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import graphReducer from './graphReducer'


// combine all reducers to one, take in history as argument for connecting it to react-router
const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  graphReducer
})

export default createRootReducer
