import { put, takeLatest, call } from 'redux-saga/effects';
import ApiCaller from '../../../common/apiCaller';

const feedBackQuestion = payload => ApiCaller('feedback-questions', 'get', payload).then(response => response);

export const watchFetchQuestion = function* watchFetchQuestion() {
  yield takeLatest('FETCH_FEEDBACK_QUESTION', function* (action) {
    try {
      const data = yield call(feedBackQuestion.bind(this, action.payload));
      yield put({ type: 'FETCH_FEEDBACK_QUESTION_SUCCESS', payload: data });
    } catch (error) {
      yield put({ type: 'FETCH_FEEDBACK_QUESTION_FAILED', payload: error });
    }
  });
};
