import { NUMERICAL_FILTER, DELETE_FILTER } from '../actions/filterActions';
import { SEARCH_BAR } from '../actions/searchBarActions';

const initialState = {
  filterByName: {
    name: '',
  },
  filterByNumericValues: [],
};

function filters(state = initialState, action) {
  switch (action.type) {
    case SEARCH_BAR:
      return { ...state, filterByName: { name: action.value } };
    case DELETE_FILTER:
      return {
        ...state,
        filterByNumericValues: state.filterByNumericValues.filter(
          (filter, index) => index !== action.index,
        ),
      };
    case NUMERICAL_FILTER: {
      const filter = action.value;
      return {
        ...state,
        filterByNumericValues: [...state.filterByNumericValues,
          {
            column: filter.column,
            comparison: filter.comparison,
            value: filter.value,
          },
        ],
      };
    }
    default:
      return state;
  }
}

export default filters;
