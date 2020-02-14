import { put, takeLatest, call } from 'redux-saga/effects';
import ApiCaller from '../../../common/apiCaller';

const getNotification = payload => ApiCaller('GetNotification', 'get', payload).then(response => response);

export const watchMyNotification = function* watchMyNotification() {
  yield takeLatest('GET_NOTIFICATIONS', function* (action) {
    try {
      const data = yield call(getNotification.bind(this, action.payload));
      yield put({ type: 'GET_NOTIFICATIONS_SUCCESS', payload: data });
    } catch (error) {
      yield put({ type: 'GET_NOTIFICATIONS_FAILED', payload: error });
    }
  });
};
