import { put, takeLatest, call } from 'redux-saga/effects';
import ApiCaller from '../../../common/apiCaller';

const userLogin = payload => ApiCaller('login', 'post', null, payload).then(response => response);

export const watchUserLogin = function* watchUserLogin() {
  yield takeLatest('USER_LOGIN', function* (action) {
    try {
      var data = [];
      if(action.payload.length == 0){
        data = action.payload;
      }
      else{
        data = yield call(userLogin.bind(this, action.payload));
      }
      yield put({ type: 'USER_LOGIN_SUCCESS', payload: data });
    } catch (error) {
      console.log(error)
      yield put({ type: 'USER_LOGIN_FAILED', payload: error });
    }
  });
};
