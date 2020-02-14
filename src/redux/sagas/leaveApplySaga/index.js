import { put, takeLatest, call } from 'redux-saga/effects';
import ApiCaller from '../../../common/apiCaller';

const leaveApply = (payload, id) => ApiCaller('LeaveApply', 'post', id, payload).then(response => response);

export const watchLeaveApply = function* watchLeaveApply() {
  yield takeLatest('LEAVE_APPLY', function* (action) {
    try {
      const data = yield call(leaveApply.bind(this, action.payload, action.id));
      yield put({ type: 'LEAVE_APPLY_SUCCESS', payload: data });
      yield put({ type: 'LEAVE_LIST', payload: action.id, id: 0 });
      yield put({ type: 'LOADER', payload: false });
    } catch (error) {
      yield put({ type: 'LEAVE_APPLY_FAILED', payload: error });
    }
  });
};
