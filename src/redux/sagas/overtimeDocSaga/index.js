import { put, takeLatest, call } from 'redux-saga/effects';
import ApiCaller from '../../../common/apiCaller1';

const overTimeDoc = (payload) => ApiCaller('overtimedoc', 'post', null, payload).then(response => response);

export const watchOvertimeDoc = function* watchOvertimeDoc() {
  yield takeLatest('OVERTIME_DOC', function* (action) {
    try {
      const data = yield call(overTimeDoc.bind(this, action.payload));
      yield put({ type: 'OVERTIME_DOC_SUCCESS', payload: data });
      // yield put({ type: 'OVER_TIME_LIST', payload: action.id, id: 0 });
      // yield put({ type: 'LOADER', payload: false });
    } catch (error) {
      yield put({ type: 'OVERTIME_DOC_FAILED', payload: error });
    }
  });
};
