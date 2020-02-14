import { put, takeLatest, call } from 'redux-saga/effects';
import ApiCaller from '../../../common/apiCaller';
import { getEventListData } from '../../../apiParser/eventDataParser';

const fetchEventList = () => ApiCaller('events', 'get').then(response => response);
export const watchEventListData = function* watchEventListData() {
  yield takeLatest('FETCH_EVENT_LIST', function* (action) {
    try {
      const data = yield call(fetchEventList);
      const eventData = getEventListData(data);
      yield put({ type: 'FETCH_EVENT_LIST_SUCCESS', payload: eventData });
    } catch (error) {
      yield put({ type: 'FETCH_EVENT_LIST_FAILED', payload: error });
    }
  });
};
