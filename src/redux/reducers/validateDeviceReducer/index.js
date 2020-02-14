export default function reducer(
    state = {
      validateDevice: {},
    },
    action,
  ) {
    switch (action.type) {
      case 'VALIDATE_DEVICE_SUCCESS': {
        return { ...state, validateDevice: action.payload };
      }
      case 'VALIDATE_DEVICE_FAILED': {
        return { ...state, validateDevice: action.payload };
      }
      default: {
        return state;
      }
    }
  }
  