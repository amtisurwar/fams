export default function reducer(
  state = {
    postEmployeeAttendance: [],
  },
  action,
) {
  switch (action.type) {
    case 'POST_EMPLOYEE_ATTENDANCE_SUCCESS': {
      return { ...state, postEmployeeAttendance: action.payload };
    }
    case 'POST_EMPLOYEE_ATTENDANCE_FAILED': {
      return { ...state, postEmployeeAttendance: action.payload };
    }
    default: {
      return state;
    }
  }
}
