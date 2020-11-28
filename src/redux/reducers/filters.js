import * as actionTypes from '../actions/actionTypes';

const initialState = {
  filters: [
    { key: 1, label: 'all', selected: true },
    { key: 2, label: 'completed', selected: false },
    { key: 3, label: 'incompleted', selected: false },
  ],
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
      case actionTypes.SELECT_FILTER: {
        const copyFilters = [...state.filters];
        for (let i = 0; i < copyFilters.length; i += 1) {
          if (copyFilters[i].key === action.payload) {
            copyFilters[i].selected = true;
          } else {
            copyFilters[i].selected = false;
          }
        }
        return {
          ...state,
          filters: copyFilters,
        };
      }
      default: {
        return state;
      }
    }
};

export default reducer;