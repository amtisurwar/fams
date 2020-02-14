import { put, takeLatest, call } from 'redux-saga/effects';
import ApiCaller from '../../../common/apiCaller';

const getOverTime = (id) => ApiCaller('getovertime', 'get', id).then(response => response);

export const watchOverTime = function* watchOverTime() {
  yield takeLatest('OVER_TIME_LIST', function* (action) {
    try {
      const data = yield call(getOverTime.bind(this, action.payload));
      yield put({ type: 'OVER_TIME_LIST_SUCCESS', payload: data });
    } catch (error) {
      yield put({ type: 'OVER_TIME_LIST_FAILED', payload: error });
    }
  });
};
