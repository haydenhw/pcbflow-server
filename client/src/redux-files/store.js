import { createStore, applyMiddleware } from 'redux';
<<<<<<< HEAD
//import thunk from 'redux-thunk';
=======
// import thunk from 'redux-thunk';
>>>>>>> undo
import logger from 'redux-logger';

import rootReducer from 'reducers/reducerIndex';
import * as actions from 'actions/indexActions';

const thunk = store => next => action =>
  typeof action === 'function' ?
    action(store.dispatch, store.getState) :
    next(action)

export default createStore(
  rootReducer,
<<<<<<< HEAD
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk /* logger()*/),
=======
  applyMiddleware(thunk, /*logger()*/),
>>>>>>> undo
);
