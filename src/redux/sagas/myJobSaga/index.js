import { put, takeLatest, call } from 'redux-saga/effects';
import ApiCaller from '../../../common/apiCaller';

const getMyJob = payload => ApiCaller('jobList', 'get', payload).then(response => response);

export const watchMyJobList = function* watchMyJobList() {
  yield takeLatest('MY_JOBS_LIST', function* (action) {
    try {
      const data = yield call(getMyJob.bind(this, action.payload));
      yield put({ type: 'MY_JOBS_LIST_SUCCESS', payload: data });
    } catch (error) {
      yield put({ type: 'MY_JOBS_LIST_FAILED', payload: error });
    }
  });
};
