import { put, takeLatest, call } from 'redux-saga/effects';
import ApiCaller from '../../../common/apiCaller';

const validateOtp = (payload, id) => ApiCaller('validateotp', 'post', id, payload).then(response => response);

export const watchValidateOtp = function* watchValidateOtp() {
  yield takeLatest('VALIDATE_OTP', function* (action) {
    try {
      var data = [];
      if(action.payload.length == 0){
        data = action.payload;
      }
      else{
        data = yield call(validateOtp.bind(this, action.payload, action.id));
      }
      yield put({ type: 'VALIDATE_OTP_SUCCESS', payload: data });
    } catch (error) {
      yield put({ type: 'VALIDATE_OTP_FAILED', payload: error });
    }
  });
};
