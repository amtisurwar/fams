export default function reducer(
  state = {
    overtimeDoc: {},
  },
  action,
) {
  switch (action.type) {
    case 'OVERTIME_DOC_SUCCESS': {
      return { ...state, overtimeDoc: action.payload };
    }
    case 'OVERTIME_DOC_FAILED': {
      return { ...state, overtimeDoc: action.payload };
    }
    default: {
      return state;
    }
  }
}
