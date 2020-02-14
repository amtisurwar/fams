import { put, takeLatest, call } from 'redux-saga/effects';

export const watchUserCredential = function* watchUserCredential() {
  yield takeLatest('SET_USER_CREDENTIAL', function* (action) {
    try {
      const data = action.payload;
      yield put({ type: 'SET_USER_CREDENTIAL_SUCCESS', payload: data });
    } catch (error) {
      yield put({ type: 'SET_USER_CREDENTIAL_FAILED', payload: error });
    }
  });
};
