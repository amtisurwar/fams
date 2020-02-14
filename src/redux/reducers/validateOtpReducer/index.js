export default function reducer(
    state = {
      validateOtp: {},
    },
    action,
  ) {
    switch (action.type) {
      case 'VALIDATE_OTP_SUCCESS': {
        return { ...state, validateOtp: action.payload };
      }
      case 'VALIDATE_OTP_FAILED': {
        return { ...state, validateOtp: action.payload };
      }
      default: {
        return state;
      }
    }
  }
  