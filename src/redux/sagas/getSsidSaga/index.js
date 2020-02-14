import { put, takeLatest, call } from 'redux-saga/effects';
import getCaller from '../../../common/getcaller';

const ssidList = (payload, id) => getCaller('getwifisetting', 'get', id, payload).then(response => response);

export const watchSsidList = function* watchTaskList() {
  yield takeLatest('GET_ALL_SSID', function* (action) {
    try {
      const data = yield call(ssidList.bind(this, action.payload, action.id));
      yield put({ type: 'SSID_LIST_SUCCESS', payload: data });
    } catch (error) {
      yield put({ type: 'SSID_LIST_SUCCESS', payload: error });
    }
  });
};
