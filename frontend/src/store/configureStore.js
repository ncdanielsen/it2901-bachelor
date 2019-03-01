import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'

import monitorReducersEnhancer from '../enhancers/monitorReducers'
import loggerMiddleware from '../middleware/logger'
import createRootReducer from '../reducers'

export const history = createBrowserHistory()

export default function configureStore(preloadedState) {
  const middlewares = [loggerMiddleware, thunkMiddleware, routerMiddleware(history)]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer, monitorReducersEnhancer]
  const composedEnhancers = composeWithDevTools(...enhancers)

  const store = createStore(createRootReducer(history), preloadedState, composedEnhancers)

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('../reducers', () => store.replaceReducer(createRootReducer(history)))
  }

  return store
}
