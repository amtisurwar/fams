import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import reducer from './reducers';
import rootSaga from './sagas/index';

const middlewares = [];
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  applyMiddleware(...middlewares, sagaMiddleware, thunk),
);

sagaMiddleware.run(rootSaga);

export default store;
