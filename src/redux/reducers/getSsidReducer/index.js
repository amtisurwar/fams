export default function reducer(
    state = {
      allSsidData: [],
    },
    action,
  ) {
    switch (action.type) {
      case 'SSID_LIST_SUCCESS': {
          console.log('SSID_LIST_SUCCESS')
        return { ...state, ssidList: action.payload };
      }
      case 'SSID_LIST_SUCCESS': {
        console.log('SSID_LIST_ERROR')
        return { ...state, ssidList: action.payload };
      }
      default: {
        return state;
      }
    }
  }
  