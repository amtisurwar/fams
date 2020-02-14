export default function reducer(
  state = {
    overTimeData: {},
  },
  action,
) {
  switch (action.type) {
    case 'OVERTIME_APPLY_SUCCESS': {
      return { ...state, overTimeData: action.payload };
    }
    case 'OVERTIME_APPLY_FAILED': {
      return { ...state, overTimeData: action.payload };
    }
    default: {
      return state;
    }
  }
}
