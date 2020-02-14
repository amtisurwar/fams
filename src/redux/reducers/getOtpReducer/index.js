export default function reducer(
    state = {
      getOtp: {},
    },
    action,
  ) {
    switch (action.type) {
      case 'GET_OTP_SUCCESS': {
        return { ...state, getOtp: action.payload };
      }
      case 'GET_OTP_FAILED': {
        return { ...state, getOtp: action.payload };
      }
      default: {
        return state;
      }
    }
  }
  