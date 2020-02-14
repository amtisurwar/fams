import { put, takeLatest, call } from 'redux-saga/effects';
import ApiCaller from '../../../common/apiCaller';

const taskTrack = (payload, id) => ApiCaller('PostTaskTrackingDetails', 'post', id, payload).then(response => response);

export const watchTaskTrack = function* watchTaskTrack() {
  yield takeLatest('TASK_TRACKING_DETAILS', function* (action) {
    try {
      const data = yield call(taskTrack.bind(this, action.payload, action.id))
      yield put({ type: 'TASK_TRACKING_SUCCESS', payload: data });
      yield put({ type: 'TASK_LIST', payload: action.taskPayload, id: action.id });
    } catch (error) {
      yield put({ type: 'TASK_TRACKING_FAILED', payload: error });
    }
  });
};
