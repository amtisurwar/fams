import { put, takeLatest, call } from 'redux-saga/effects';
import ApiCaller from '../../../common/apiCaller';
import { getEventListData } from '../../../apiParser/eventDataParser';

const fetchAgendaList = payload => ApiCaller('getagenda', 'post', payload.accessToken, payload.eventId).then(response => response);

export const watchAgendaListData = function* watchAgendaListData() {
  yield takeLatest('FETCH_AGENDA_LIST', function* (action) {
    try {
      const data = yield call(fetchAgendaList.bind(this, action.payload));
      //const eventData = getEventListData(data);
      yield put({ type: 'FETCH_AGENDA_LIST_SUCCESS', payload: data });
    } catch (error) {
      yield put({ type: 'FETCH_AGENDA_LIST_FAILED', payload: error });
    }
  });
};
