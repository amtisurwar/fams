export default function reducer(
  state = {
    uploadDoc: {},
  },
  action,
) {
  switch (action.type) {
    case 'UPDATE_DOC_SUCCESS': {
      return { ...state, uploadDoc: action.payload };
    }
    case 'UPDATE_DOC_FAILED': {
      return { ...state, uploadDoc: action.payload };
    }
    default: {
      return state;
    }
  }
}
