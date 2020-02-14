import { put, takeLatest, call } from 'redux-saga/effects';
import ApiCaller from '../../../common/apiCaller';

const validateDevice = (payload, id) => ApiCaller('validatedevice', 'post', id, payload).then(response => response);

export const watchValidateDevice = function* watchValidateDevice() {
  yield takeLatest('VALIDATE_DEVICE', function* (action) {
    try {
      const data = yield call(validateDevice.bind(this, action.payload, action.id));
      yield put({ type: 'VALIDATE_DEVICE_SUCCESS', payload: data });
    } catch (error) {
      yield put({ type: 'VALIDATE_DEVICE_FAILED', payload: error });
    }
  });
};
