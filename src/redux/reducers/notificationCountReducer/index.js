export default function reducer(
  state = {
    notification: "0",
  },
  action,
) {
  switch (action.type) {
    case 'NOTIFICATION_COUNT_SUCCESS': {
      return { ...state, notification: action.payload };
    }
    case 'NOTIFICATION_COUNT_FAILED': {
      return { ...state, notification: action.payload };
    }
    default: {
      return state;
    }
  }
}
