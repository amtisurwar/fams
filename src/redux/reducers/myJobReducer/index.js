export default function reducer(
  state = {
    myJobs: [],
  },
  action,
) {
  switch (action.type) {
    case 'MY_JOBS_LIST_SUCCESS': {
      return { ...state, myJobs: action.payload };
    }
    case 'MY_JOBS_LIST_FAILED': {
      return { ...state, myJobs: action.payload };
    }
    default: {
      return state;
    }
  }
}
