export default function reducer(
  state = {
    data: [],
  },
  action,
) {
  switch (action.type) {
    case 'SET_USER_CREDENTIAL_SUCCESS': {
      return { ...state, data: action.payload };
    }
    case 'SET_USER_CREDENTIAL_FAILED': {
      return { ...state, data: action.payload };
    }
    default: {
      return state;
    }
  }
}
