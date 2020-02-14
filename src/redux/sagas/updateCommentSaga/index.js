import { put, takeLatest, call } from 'redux-saga/effects';
import ApiCaller from '../../../common/apiCaller';

const updateComment = (payload, id) => ApiCaller('UpdateTask', 'post', id, payload).then(response => response);

export const watchUpdateComment = function* watchUpdateComment() {
  yield takeLatest('UPDATE_TASK_COMMENT', function* (action) {
    try {
      const data = yield call(updateComment.bind(this, action.payload, action.id));
      yield put({ type: 'UPDATE_TASK_COMMENT_SUCCESS', payload: data });
      yield put({ type: 'TASK_LIST', payload: action.taskData, id: action.id });
    } catch (error) {
      yield put({ type: 'UPDATE_TASK_COMMENT_FAILED', payload: error });
    }
  });
};
