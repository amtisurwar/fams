import { put, takeLatest, call } from 'redux-saga/effects';
import ApiCaller from '../../../common/apiCaller';

const dashboardData = payload => ApiCaller('employeedashboard', 'get', payload).then(response => response);

export const watchDashboardData = function* watchDashboardData() {
  yield takeLatest('DASHBOARD_DATA', function* (action) {
    try {
      const data = yield call(dashboardData.bind(this, action.payload));
      yield put({ type: 'DASHBOARD_DATA_SUCCESS', payload: data });
    } catch (error) {
      yield put({ type: 'DASHBOARD_DATA_FAILED', payload: error });
    }
  });
};
