export default function reducer(
    state = {
      myBreak: [],
    },
    action,
  ) {
    switch (action.type) {
      case 'MY_BREAK_LIST_SUCCESS': {
        return { ...state, myBreak: action.payload };
      }
      case 'MY_BREAK_LIST_FAILED': {
        return { ...state, myBreak: action.payload };
      }
      default: {
        return state;
      }
    }
  }
  