export default function reducer(
    state = {
      allTask: [],
    },
    action,
  ) {
    switch (action.type) {
      case 'ALL_TASK_LIST_SUCCESS': {
        return { ...state, allTask: action.payload };
      }
      case 'ALL_TASK_LIST_FAILED': {
        return { ...state, allTask: action.payload };
      }
      default: {
        return state;
      }
    }
  }
  