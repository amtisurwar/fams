import { put, takeLatest, call } from 'redux-saga/effects';
import ApiCaller from '../../../common/apiCaller1';

const updateDocument = (payload) => ApiCaller('leaveapplydoc', 'post', null, payload).then(response => response);

export const watchUpdateDoc = function* watchUpdateDoc() {
  yield takeLatest('UPDATE_DOC', function* (action) {
    try {
      const data = yield call(updateDocument.bind(this, action.payload));
      yield put({ type: 'UPDATE_DOC_SUCCESS', payload: data });
    } catch (error) {
      yield put({ type: 'UPDATE_DOC_FAILED', payload: error });
    }
  });
};
