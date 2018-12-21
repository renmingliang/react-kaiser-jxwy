import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import reducers from '../reducers';

let enhancer = process.env.NODE_ENV === 'development' ? applyMiddleware(thunk, createLogger()) : applyMiddleware(thunk)

let store = createStore(reducers, enhancer)

if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }
}

export default store;
