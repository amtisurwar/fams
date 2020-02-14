import { all } from 'redux-saga/effects';
import { watchUserLogin } from './loginSaga/';
import { watchUserCredential } from './saveCredentialSaga/';
import { watchMyJobList } from './myJobSaga/';
import { watchTaskList } from './taskListSaga/';
import { watchTaskTrack } from './jobTaskTrackingSaga/';
import { watchEmployeeAttendance } from './employeeAttendanceSaga/';
import { watchPostEmployeeAttendance } from './postEmployeeAttendanceSaga/';
import { watchDeviceInfo } from './deviceInfoSaga/';
import { watchMyDropDown } from './leaveTypeDropDownSaga/';
import { watchLeaveApply } from './leaveApplySaga/';
import { watchLeaveList } from './leaveListSaga/';
import { watchLoader } from './loaderSaga/';
import { watchUserLogout } from './logoutSaga/';
import { watchOverTime } from './overTimeListSaga/';
import { watchNotification } from './notificationCountSaga/';
import { watchMyNotification } from './notificationSaga/';
import { watchUpdateComment } from './updateCommentSaga/';
import { watchUpdateDoc } from './uploadDocumentSaga/';
import { watchOvertimeApply } from './overtimeApplySaga/';
import { watchOvertimeDoc } from './overtimeDocSaga/';
import { watchSendTaskDoc } from './sendTaskDocSaga/';
import { watchSsidList} from './getSsidSaga';
import { watchValidateOtp} from './validateOtpSaga';
import { watchValidateDevice} from './validateDeviceSaga';
import { watchgetOtp} from './getOtpSaga';
import { watchDashboardData} from './dashboardDataSaga';
import { watchallTaskList} from './allTaskSaga';
import { watchMyBreakList} from './myBreakSaga';
import { watchGetResumedTaskList} from './getResumedTaskSaga';

const rootSaga = function* rootSaga() {
  yield all([
    watchUserLogin(),
    watchValidateOtp(),
    watchGetResumedTaskList(),
    watchValidateDevice(),
    watchgetOtp(),
    watchMyBreakList(),
    watchUserLogout(),
    watchUserCredential(),
    watchMyJobList(),
    watchTaskList(),
    watchTaskTrack(),
    watchDeviceInfo(),
    watchMyDropDown(),
    watchEmployeeAttendance(),
    watchLeaveApply(),
    watchUpdateDoc(),
    watchLoader(),
    watchLeaveList(),
    watchOverTime(),
    watchNotification(),
    watchMyNotification(),
    watchUpdateComment(),
    watchOvertimeApply(),
    watchOvertimeDoc(),
    watchSendTaskDoc(),
    watchPostEmployeeAttendance(),
    watchSsidList(),
    watchallTaskList(),
    watchDashboardData()
  ]);
};

export default rootSaga;
