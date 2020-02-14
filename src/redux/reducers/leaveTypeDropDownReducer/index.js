export default function reducer(
  state = {
    leaveType: {},
  },
  action,
) {
  switch (action.type) {
    case 'GET_LEAVE_DROPDOWN_SUCCESS': {
      return { ...state, leaveType: action.payload };
    }
    case 'GET_LEAVE_DROPDOWN_FAILED': {
      return { ...state, leaveType: action.payload };
    }
    default: {
      return state;
    }
  }
}
