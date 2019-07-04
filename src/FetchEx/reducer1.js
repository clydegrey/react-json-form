const reducer1 = (state, action) => {
  switch (action.type) {
    case 'fetched':
      return {
        ...state,
        isFetching: false,
        responseData: action.payload
      };
    case 'error':
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default reducer1;
