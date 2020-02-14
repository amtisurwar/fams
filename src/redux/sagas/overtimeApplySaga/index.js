import { put, takeLatest, call } from 'redux-saga/effects';
import ApiCaller from '../../../common/apiCaller';

const overTimeApply = (payload, id) => ApiCaller('applyovertime', 'post', id, payload).then(response => response);

export const watchOvertimeApply = function* watchOvertimeApply() {
  yield takeLatest('OVERTIME_APPLY', function* (action) {
    try {
      const data = yield call(overTimeApply.bind(this, action.payload, action.id));
      yield put({ type: 'OVERTIME_APPLY_SUCCESS', payload: data });
      // yield put({ type: 'OVER_TIME_LIST', payload: action.id, id: 0 });
      // yield put({ type: 'LOADER', payload: false });
    } catch (error) {
      yield put({ type: 'OVERTIME_APPLY_FAILED', payload: error });
    }
  });
};
