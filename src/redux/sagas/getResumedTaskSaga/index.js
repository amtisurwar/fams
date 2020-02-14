import { put, takeLatest, call } from 'redux-saga/effects';
import ApiCaller from '../../../common/apiCaller';

const getResumedTaskList = payload => ApiCaller('GetNotification', 'get', payload).then(response => response);

export const watchGetResumedTaskList = function* watchGetResumedTaskList() {
  yield takeLatest('GET_RESUMED_TASK', function* (action) {
    try {
      const data = yield call(getResumedTaskList.bind(this, action.payload));
      yield put({ type: 'GET_RESUMED_TASK_SUCCESS', payload: data });
    } catch (error) {
      yield put({ type: 'GET_RESUMED_TASK_FAILED', payload: error });
    }
  });
};
