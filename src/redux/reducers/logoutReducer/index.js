export default function reducer(
  state = {
    logout: {},
  },
  action,
) {
  switch (action.type) {
    case 'LOGOUT_SUCCESS': {
      return { ...state, logout: action.payload };
    }
    case 'LOGOUT_FAILED': {
      return { ...state, logout: action.payload };
    }
    default: {
      return state;
    }
  }
}
