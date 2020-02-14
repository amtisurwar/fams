import { put, takeLatest, call } from 'redux-saga/effects';
import ApiCaller from '../../../common/apiCaller1';

const sendTask = (payload) => ApiCaller('sendtaskdoc', 'post', null, payload).then(response => response);

export const watchSendTaskDoc = function* watchSendTaskDoc() {
  yield takeLatest('SEND_TASK_DOC', function* (action) {
    try {
      const data = yield call(sendTask.bind(this, action.payload));
      yield put({ type: 'SEND_TASK_DOC_SUCCESS', payload: data });
      // yield put({ type: 'OVER_TIME_LIST', payload: action.id, id: 0 });
      // yield put({ type: 'LOADER', payload: false });
    } catch (error) {
      yield put({ type: 'SEND_TASK_DOC_FAILED', payload: error });
    }
  });
};
