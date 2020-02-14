export default function reducer(
    state = {
      getResumedTask: {},
    },
    action,
  ) {
    switch (action.type) {
      case 'GET_RESUMED_TASK_SUCCESS': {
        return { ...state, getResumedTask: action.payload };
      }
      case 'GET_RESUMED_TASK_FAILED': {
        return { ...state, getResumedTask: action.payload };
      }
      default: {
        return state;
      }
    }
  }
  