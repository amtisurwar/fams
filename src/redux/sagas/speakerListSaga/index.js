import { put, takeLatest, call } from 'redux-saga/effects';
import ApiCaller from '../../../common/apiCaller';
import { getEventListData } from '../../../apiParser/eventDataParser';

const fetchSpeakersList = payload => ApiCaller('speakerbyevent', 'post', null, payload).then(response => response);

export const watchSpeakerListData = function* watchSpeakerListData() {
  yield takeLatest('FETCH_SPEAKERS_LIST', function* (action) {
    try {
      const data = yield call(fetchSpeakersList.bind(this, action.payload));
      yield put({ type: 'FETCH_SPEAKERS_LIST_SUCCESS', payload: data });
    } catch (error) {
      yield put({ type: 'FETCH_SPEAKERS_LIST_FAILED', payload: error });
    }
  });
};
