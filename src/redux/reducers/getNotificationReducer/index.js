export default function reducer(
  state = {
    notifications: {},
  },
  action,
) {
  switch (action.type) {
    case 'GET_NOTIFICATIONS_SUCCESS': {
      return { ...state, notifications: action.payload };
    }
    case 'GET_NOTIFICATIONS_FAILED': {
      return { ...state, notifications: action.payload };
    }
    default: {
      return state;
    }
  }
}
