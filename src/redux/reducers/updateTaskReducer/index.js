export default function reducer(
  state = {
    updateComment: {},
  },
  action,
) {
  switch (action.type) {
    case 'UPDATE_TASK_COMMENT_SUCCESS': {
      return { ...state, updateComment: action.payload };
    }
    case 'UPDATE_TASK_COMMENT_FAILED': {
      return { ...state, updateComment: action.payload };
    }
    default: {
      return state;
    }
  }
}
