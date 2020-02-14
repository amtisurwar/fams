export default function reducer(
    state = {
      dashboardData: [],
    },
    action,
  ) {
    switch (action.type) {
      case 'DASHBOARD_DATA_SUCCESS': {
        return { ...state, dashboardData: action.payload };
      }
      case 'DASHBOARD_DATA_FAILED': {
        return { ...state, dashboardData: action.payload };
      }
      default: {
        return state;
      }
    }
  }
  