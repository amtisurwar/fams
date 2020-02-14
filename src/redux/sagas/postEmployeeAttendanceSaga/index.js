import { put, takeLatest, call } from 'redux-saga/effects';
import ApiCaller from '../../../common/apiCaller';

const postEmployeeAttendance = (payload, id) => ApiCaller('PostEmployeeAttendence', 'post', id, payload).then(response => response);

export const watchPostEmployeeAttendance = function* watchPostEmployeeAttendance() {
  yield takeLatest('POST_EMPLOYEE_ATTENDANCE', function* (action) {
    try {
      const data = yield call(postEmployeeAttendance.bind(this, action.payload, action.id));
      yield put({ type: 'POST_EMPLOYEE_ATTENDANCE_SUCCESS', payload: data });
      yield put({ type: 'GET_EMPLOYEE_ATTENDANCE', payload: action.id });
    } catch (error) {
      yield put({ type: 'POST_EMPLOYEE_ATTENDANCE_FAILED', payload: error });
    }
  });
};
