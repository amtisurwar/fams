export default function reducer(
  state = {
    taskList: [],
  },
  action,
) {
  switch (action.type) {
    case 'TASK_LIST_SUCCESS': {
      return { ...state, taskList: action.payload };
    }
    case 'TASK_LIST_FAILED': {
      return { ...state, taskList: action.payload };
    }
    default: {
      return state;
    }
  }
}
