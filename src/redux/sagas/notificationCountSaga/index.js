import { put, takeLatest, call } from 'redux-saga/effects';

export const watchNotification = function* watchNotification() {
  yield takeLatest('NOTIFICATION_COUNT', function* (action) {
    try {
      const data = action.payload;
      yield put({ type: 'NOTIFICATION_COUNT_SUCCESS', payload: data });
    } catch (error) {
      yield put({ type: 'NOTIFICATION_COUNT_FAILED', payload: error });
    }
  });
};
