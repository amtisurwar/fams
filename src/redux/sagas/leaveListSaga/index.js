import { put, takeLatest, call } from 'redux-saga/effects';
import ApiCaller from '../../../common/apiCaller';

const getLeaveList = (id, payload) => ApiCaller('LeaveList?Id='+id, 'get', payload).then(response => response);

export const watchLeaveList = function* watchLeaveList() {
  yield takeLatest('LEAVE_LIST', function* (action) {
    try {
      const data = yield call(getLeaveList.bind(this, action.id, action.payload));
      yield put({ type: 'LEAVE_LIST_SUCCESS', payload: data });
    } catch (error) {
      yield put({ type: 'LEAVE_LIST_FAILED', payload: error });
    }
  });
};
