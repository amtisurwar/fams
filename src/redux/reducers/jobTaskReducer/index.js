export default function reducer(
  state = {
    jobTaskTrack: {},
  },
  action,
) {
  switch (action.type) {
    case 'TASK_TRACKING_SUCCESS': {
      return { ...state, jobTaskTrack: action.payload };
    }
    case 'TASK_TRACKING_FAILED': {
      return { ...state, jobTaskTrack: action.payload };
    }
    default: {
      return state;
    }
  }
}
