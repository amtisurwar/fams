import { combineReducers } from 'redux';

import loginData from './loginReducer/';
import logoutData from './logoutReducer/';
import userCredential from './userCredentialReducer/';
import jobList from './myJobReducer/';
import allTask from './allTaskListReducer/';
import taskList from './taskListReducer/';
import jobTaskList from './jobTaskReducer/';
import employeeAttendance from './employeeAttendanceReducer/';
import postEmployeeAttendance from './postEmployeeAttendanceReducer/';
import deviceInfo from './deviceInfoReducer/';
import leaveData from './leaveTypeDropDownReducer/';
import leaveApply from './leaveApplyReducer/';
import loginReducer from './loginReducer/';
import loading from './loaderReducer/';
import leaveList from './leaveListReducer/';
import overTime from './overTimeListReducer/';
import notificationCount from './notificationCountReducer/';
import notificationData from './getNotificationReducer/';
import updateTask from './updateTaskReducer/';
import uploadDoc from './uploadDocumentReducer/';
import overTimeApply from './overtimeApplyReducer/';
import overTimeDoc from './overtimeDocumentReducer/';
import sendTaskDoc from './sendTaskDocReducer/';
import allSsidData from './getSsidReducer';
import validateDevice from './validateDeviceReducer';
import validateOtp from './validateOtpReducer';
import getOtp from './getOtpReducer';
import dashboardData from './dashboardDataReducer';
import myBreak from './myBreakReducer';

export default combineReducers({
  loginData,
  validateDevice,
  validateOtp,
  getOtp,
  logoutData,
  userCredential,
  jobList,
  taskList,
  deviceInfo,
  jobTaskList,
  leaveData,
  allTask,
  leaveApply,
  loading,
  loginReducer,
  leaveList,
  overTime,
  updateTask,
  uploadDoc,
  overTimeApply,
  overTimeDoc,
  sendTaskDoc,
  employeeAttendance,
  postEmployeeAttendance,
  notificationCount,
  notificationData,
  allSsidData,
  dashboardData,
  myBreak
});
