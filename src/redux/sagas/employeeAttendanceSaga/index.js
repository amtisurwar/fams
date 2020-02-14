import { put, takeLatest, call } from 'redux-saga/effects';
import ApiCaller from '../../../common/apiCaller';

const employeeAttendance = payload => ApiCaller('EmployeeAttendence', 'get', payload).then(response => response);

export const watchEmployeeAttendance = function* watchEmployeeAttendance() {
  yield takeLatest('GET_EMPLOYEE_ATTENDANCE', function* (action) {
    try {
      const data = yield call(employeeAttendance.bind(this, action.payload));
      yield put({ type: 'EMPLOYEE_ATTENDANCE_SUCCESS', payload: data });
    } catch (error) {
      yield put({ type: 'EMPLOYEE_ATTENDANCE_FAILED', payload: error });
    }
  });
};
