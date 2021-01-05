import { STORE_CONFIGURATION } from '../actions/configuration';

const initialState = {
  apiFilters: {
    category: 'All',
    difficulty: 'All',
    type: 'All',
  },
};

export default (state = initialState, { type, apiFilters }) => {
  console.log(type, apiFilters);
  switch (type) {
    case STORE_CONFIGURATION:
      return { ...state, apiFilters };
    default:
      return state;
  }
};
