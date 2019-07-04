import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'

import monitorReducersEnhancer from '../enhancers/monitorReducers'
import loggerMiddleware from '../middleware/logger'
import createRootReducer from '../reducers'

// basic browserHistory, used together with react-router
export const history = createBrowserHistory()

// this function sets up the redux store
export default function configureStore(preloadedState) {
  // loggerMiddleware logs to console when redux related actions happen, can be removed if not found useful
  // thunkMiddleware allows async actions
  // routerMiddleware keeps the router reducer in sync with browser history
  const middlewares = [loggerMiddleware, thunkMiddleware, routerMiddleware(history)]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  // monitorReducersEnhancer logs the time the reducer takes, useful for analysing performance
  const enhancers = [middlewareEnhancer, monitorReducersEnhancer]

  // composeWithDevTools allows for browser extensions to explore redux stuff
  const composedEnhancers = composeWithDevTools(...enhancers)

  // finally ready to create the redux store!
  // preloadedState is currently empty and can be ignored, but should be there
  const store = createStore(createRootReducer(history), preloadedState, composedEnhancers)

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    // autorefresh website with initialState for all reducers when a reducer is changed in the code
    module.hot.accept('../reducers', () => store.replaceReducer(createRootReducer(history)))
  }

  return store
}
