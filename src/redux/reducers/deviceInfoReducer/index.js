export default function reducer(
  state = {
    deviceData: [],
  },
  action,
) {
  switch (action.type) {
    case 'DEVICE_INFO_SUCCESS': {
      return { ...state, deviceData: action.payload };
    }
    case 'DEVICE_INFO_FAILED': {
      return { ...state, deviceData: action.payload };
    }
    default: {
      return state;
    }
  }
}
