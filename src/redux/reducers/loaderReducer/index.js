export default function reducer(
  state = {
    loader: false,
  },
  action,
) {
  switch (action.type) {
    case 'LOADER_SUCCESS': {
      return { ...state, loader: action.payload };
    }
    case 'LOADER_FAILED': {
      return { ...state, loader: action.payload };
    }
    default: {
      return state;
    }
  }
}
