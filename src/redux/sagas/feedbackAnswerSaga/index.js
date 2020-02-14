import { put, takeLatest, call } from 'redux-saga/effects';
import ApiCaller from '../../../common/apiCaller';

const feedBackAnswer = payload => ApiCaller('feedback-answer', 'post', payload.accessToken, payload.data).then(response => response);

export const watchFetchAnswer = function* watchFetchAnswer() {
  yield takeLatest('FETCH_FEEDBACK_ANSWER', function* (action) {
    try {
      const data = yield call(feedBackAnswer.bind(this, action.payload));
      yield put({ type: 'FETCH_FEEDBACK_ANSWER_SUCCESS', payload: data });
    } catch (error) {
      yield put({ type: 'FETCH_FEEDBACK_ANSWER_FAILED', payload: error });
    }
  });
};
