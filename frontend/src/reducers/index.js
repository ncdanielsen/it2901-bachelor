import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import uiReducer from './uiReducer'
import serverReducer from './serverReducer'


// combine all reducers to one, take in history as argument for connecting it to react-router
const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  uiReducer,
  serverReducer
})

export default createRootReducer
