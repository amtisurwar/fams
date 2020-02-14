import { put, takeLatest, call } from 'redux-saga/effects';
import ApiCaller from '../../../common/apiCaller';
import moment from 'moment'
import * as Helper from '../../../common/helper';

var payloadResumeTask = [];
var momentTz = require('moment-timezone');
const userLogout = (id, payload) => ApiCaller('Logout', 'post', id, payload).then(response => response);
var allResumeTask = id => ApiCaller('GetRuningTask', 'get', id).then(response => response);

var pauseAllTask = (id) => ApiCaller('PostAllTaskTrackingDetails', 'post', id, payloadResumeTask).then(response => response);

export const watchUserLogout = function* watchUserLogout() {
  yield takeLatest('LOGOUT', function* (action) {
    try {
      const data = yield call(userLogout.bind(this, action.id, action.payload));
      const dataResumeTask = yield call(allResumeTask.bind(this, action.id));
      if(dataResumeTask.Data.task.length > 0){
        dataResumeTask.Data.task.map(dataItem => {
          
          var worksec = parseInt((new Date(momentTz().tz('Asia/Kolkata').format()).getTime() - new Date(momentTz.tz(momentTz(dataItem.TrackingDatetime).tz('America/Los_Angeles'), "Asia/Kolkata").format()).getTime()) / 1000) + dataItem.worksec;
          var workHours = Helper.getTimeShow(worksec);
         
          payloadResumeTask.push(
            {
              "Task_ID": dataItem.Task_ID,
              "User_ID": dataItem.User_ID,
              "Job_ID": dataItem.Job_ID,
              "TrackingDatetime": moment().format('YYYY-MM-DD hh:mm:ss a'),
              "WorkHours": workHours,
              "TaskStatus": "Paused",
              "totaltime": worksec,
              "worksec": worksec - dataItem.worksec,
              "Min_Efficiency": dataItem.TotalStallValue,
              "Stall_Id": dataItem.Stall_Id,
              "TotalStallValue": dataItem.TotalStallValue
          }
          )
          console.log(payloadResumeTask);  
        })
      }


      const dataPausedTask = yield call(pauseAllTask.bind(this, action.id));
      payloadResumeTask = [];
      yield put({ type: 'GET_RESUMED_TASK_SUCCESS', payload: dataPausedTask });
      yield put({ type: 'SET_USER_CREDENTIAL_SUCCESS', payload: [] });
      yield put({ type: 'NOTIFICATION_COUNT_SUCCESS', payload: "0" });
      yield put({ type: 'VALIDATE_OTP_SUCCESS', payload: [] });
      yield put({ type: 'USER_LOGIN_SUCCESS', payload: [] });
      yield put({ type: 'LOGOUT_SUCCESS', payload: data });
      

    } catch (error) {
      yield put({ type: 'GET_RESUMED_TASK_FAILED', payload: error });
      yield put({ type: 'SET_USER_CREDENTIAL_FAILED', payload: error });
      yield put({ type: 'NOTIFICATION_COUNT_FAILED', payload: error });
      yield put({ type: 'VALIDATE_OTP_FAILED', payload: error });
      yield put({ type: 'USER_LOGIN_FAILED', payload: error });
      yield put({ type: 'LOGOUT_FAILED', payload: error });
    }
  });
};
