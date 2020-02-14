import { put, takeLatest, call } from 'redux-saga/effects';

export const watchDeviceInfo = function* watchDeviceInfo() {
  yield takeLatest('DEVICE_INFO', function* (action) {
    try {
      const data = action.payload;
      yield put({ type: 'DEVICE_INFO_SUCCESS', payload: data });
    } catch (error) {
      yield put({ type: 'DEVICE_INFO_FAILED', payload: error });
    }
  });
};
