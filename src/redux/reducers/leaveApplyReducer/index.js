export default function reducer(
  state = {
    leaveData: {},
  },
  action,
) {
  switch (action.type) {
    case 'LEAVE_APPLY_SUCCESS': {
      return { ...state, leaveData: action.payload };
    }
    case 'LEAVE_APPLY_FAILED': {
      return { ...state, leaveData: action.payload };
    }
    default: {
      return state;
    }
  }
}
