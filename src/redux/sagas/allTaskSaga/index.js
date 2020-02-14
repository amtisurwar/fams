import { put, takeLatest, call } from 'redux-saga/effects';
import ApiCaller from '../../../common/apiCaller';

const allTaskList = (payload, id) => ApiCaller('TaskList', 'post', id, payload).then(response => response);

export const watchallTaskList = function* watchallTaskList() {
  yield takeLatest('ALL_TASK_LIST', function* (action) {
    try {
      const data = yield call(allTaskList.bind(this, action.payload, action.id));
      yield put({ type: 'ALL_TASK_LIST_SUCCESS', payload: data });
    } catch (error) {
      yield put({ type: 'ALL_TASK_LIST_FAILED', payload: error });
    }
  });
};
