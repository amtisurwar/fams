export default function reducer(
  state = {
    login: [],
  },
  action,
) {
  switch (action.type) {
    case 'USER_LOGIN_SUCCESS': {
      return { ...state, login: action.payload };
    }
    case 'USER_LOGIN_FAILED': {
      return { ...state, login: action.payload };
    }
    default: {
      return state;
    }
  }
}
