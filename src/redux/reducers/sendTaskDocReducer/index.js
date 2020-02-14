export default function reducer(
  state = {
    sendTaskDoc: {},
  },
  action,
) {
  switch (action.type) {
    case 'SEND_TASK_DOC_SUCCESS': {
      return { ...state, sendTaskDoc: action.payload };
    }
    case 'SEND_TASK_DOC_FAILED': {
      return { ...state, sendTaskDoc: action.payload };
    }
    default: {
      return state;
    }
  }
}
