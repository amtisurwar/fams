import { put, takeLatest, call } from 'redux-saga/effects';
import ApiCaller from '../../../common/apiCaller';
import { getEventListData } from '../../../apiParser/eventDataParser';

const fetchSponserList = payload => ApiCaller('sponsorbyevent', 'post', null, payload).then(response => response);

export const watchSponserListData = function* watchSponserListData() {
  yield takeLatest('FETCH_SPONSERS_LIST', function* (action) {
    try {
      const data = yield call(fetchSponserList.bind(this, action.payload));
      //const eventData = getEventListData(data);
      yield put({ type: 'FETCH_SPONSERS_LIST_SUCCESS', payload: data });
    } catch (error) {
      yield put({ type: 'FETCH_SPONSERS_LIST_FAILED', payload: error });
    }
  });
};
