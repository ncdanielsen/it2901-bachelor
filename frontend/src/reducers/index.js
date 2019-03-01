import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import graphReducer from './graphReducer'

export default (history) => combineReducers({
  router: connectRouter(history),
  graphReducer
})
