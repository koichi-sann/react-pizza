const constants = {
  SET_SORT_BY: 'SET_SORT_BY',
  SET_CATEGORY: 'SET_CATEGORY',
};

const initialState = {
  category: null,
  sortBy: {
    type: 'popular',
    order: 'desc',
  },
};

const filters = (state = initialState, action) => {
  if (action.type === constants.SET_SORT_BY) {
    return {
      ...state,
      sortBy: action.payload,
    };
  }
  if (action.type === constants.SET_CATEGORY) {
    return {
      ...state,
      category: action.payload,
    };
  }
  return state;
};

export default filters;
