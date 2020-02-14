import { put, takeLatest, call } from 'redux-saga/effects';

export const watchLoader = function* watchLoader() {
  yield takeLatest('LOADER', function* (action) {
    try {
      const data = action.payload;
      yield put({ type: 'LOADER_SUCCESS', payload: data });
    } catch (error) {
      yield put({ type: 'LOADER_FAILED', payload: error });
    }
  });
};
