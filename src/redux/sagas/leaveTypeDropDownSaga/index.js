import { put, takeLatest, call } from 'redux-saga/effects';
// import { dropDownFilter } from '../apiParser/dataParser';
import ApiCaller from '../../../common/apiCaller';

const getDropDown = payload => ApiCaller('GetLeave', 'get', payload).then(response => response);

export const watchMyDropDown = function* watchMyDropDown() {
  yield takeLatest('GET_LEAVE_DROPDOWN', function* (action) {
    try {
      const data = yield call(getDropDown.bind(this, action.payload));
      // const valueData = dropDownFilter(data);
      yield put({ type: 'GET_LEAVE_DROPDOWN_SUCCESS', payload: data });
    } catch (error) {
      yield put({ type: 'GET_LEAVE_DROPDOWN_FAILED', payload: error });
    }
  });
};
