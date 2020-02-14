import { put, takeLatest, call } from 'redux-saga/effects';
import ApiCaller from '../../../common/apiCaller';
const ID = 90 ;
const myBreak = payload => ApiCaller('BreakAssignEmpList' + '?id=' + payload.userValueID, 'get', payload.value).then(response => response);

export const watchMyBreakList = function* watchMyBreakList() {
  yield takeLatest('MY_BREAK_LIST', function* (action) {
    try {
      const data = yield call(myBreak.bind(this, action.payload));
      yield put({ type: 'MY_BREAK_LIST_SUCCESS', payload: data });
    } catch (error) {
      yield put({ type: 'MY_BREAK_LIST_FAILED', payload: error });
    }
  });
};
