export default function reducer(
  state = {
    overTimeData: {},
  },
  action,
) {
  switch (action.type) {
    case 'OVER_TIME_LIST_SUCCESS': {
      return { ...state, overTimeData: action.payload };
    }
    case 'OVER_TIME_LIST_FAILED': {
      return { ...state, overTimeData: action.payload };
    }
    default: {
      return state;
    }
  }
}
