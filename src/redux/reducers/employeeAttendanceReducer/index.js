export default function reducer(
  state = {
    employeeAttendance: [],
  },
  action,
) {
  switch (action.type) {
    case 'EMPLOYEE_ATTENDANCE_SUCCESS': {
      return { ...state, employeeAttendance: action.payload };
    }
    case 'EMPLOYEE_ATTENDANCE_FAILED': {
      return { ...state, employeeAttendance: action.payload };
    }
    default: {
      return state;
    }
  }
}
