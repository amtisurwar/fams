import { put, takeLatest, call } from 'redux-saga/effects';
import ApiCaller from '../../../common/apiCaller';

const getOtp = (payload, id) => ApiCaller('getotp', 'post', id, payload).then(response => response);

export const watchgetOtp = function* watchgetOtp() {
  yield takeLatest('GET_OTP', function* (action) {
    try {
      var data = [];
      if(action.payload.length == 0){
        data = action.payload;
      }
      else{
        data = yield call(getOtp.bind(this, action.payload, action.id));
      }
      yield put({ type: 'GET_OTP_SUCCESS', payload: data });
    } catch (error) {
      yield put({ type: 'GET_OTP_FAILED', payload: error });
    }
  });
};
