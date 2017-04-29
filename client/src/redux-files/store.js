import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from 'reducers/reducerIndex';
import * as actions from 'actions/indexActions';

const thunk = store => next => action =>
  typeof action === 'function' ?
    action(store.dispatch, store.getState) :
    next(action)

export default createStore(
  rootReducer,
  applyMiddleware(thunk, /*logger()*/),
);
