import { put, takeLatest, call } from 'redux-saga/effects';
import ApiCaller from '../../../common/apiCaller';

const addAgenda = payload => ApiCaller('registeragenda', 'post', payload.accessToken, {'agenda_id': payload.agenda_id }).then(response => response);

export const watchAddAgenda = function* watchAddAgenda() {
  yield takeLatest('ADD_AGENDA', function* (action) {
    try {
      const data = yield call(addAgenda.bind(this, action.payload));
      yield put({ type: 'ADD_AGENDA_SUCCESS', payload: data });
    } catch (error) {
      yield put({ type: 'ADD_AGENDA_FAILED', payload: error });
    }
  });
};
