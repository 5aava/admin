import { applyMiddleware, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import monitorReducersEnhancer from './monitorReducer';
import loggerMiddleware from './logger';
import rootReducer from './reducers';
import apiMiddleware from '../controllers/middleware';


export default function configureStore (preloadedState) {
  const middlewares = [loggerMiddleware, thunkMiddleware, apiMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer, monitorReducersEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  return store;
}
