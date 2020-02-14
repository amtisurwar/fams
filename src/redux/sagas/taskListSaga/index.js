import { put, takeLatest, call } from 'redux-saga/effects';
import ApiCaller from '../../../common/apiCaller';

const taskList = (payload, id) => ApiCaller('TaskList', 'post', id, payload).then(response => response);

export const watchTaskList = function* watchTaskList() {
  yield takeLatest('TASK_LIST', function* (action) {
    try {
      const data = yield call(taskList.bind(this, action.payload, action.id));
      yield put({ type: 'TASK_LIST_SUCCESS', payload: data });
      yield put({ type: 'MY_JOBS_LIST', payload: action.id });
    } catch (error) {
      yield put({ type: 'TASK_LIST_FAILED', payload: error });
    }
  });
};
