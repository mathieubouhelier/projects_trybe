import { CHANGE_VISIBILITY } from '../actions/index';
import { SEARCH_RESULT_MORE_ONE } from '../actions/searchBarAction';

const INITIAL_STATE = {
  isVisible: false,
  searchResultMoreOne: false,
};

const searchBar = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_VISIBILITY:
      return {
        ...state,
        isVisible: !state.isVisible,
      };
    case SEARCH_RESULT_MORE_ONE:
      return {
        ...state,
        searchResultMoreOne: !state.searchResultMoreOne,
      };
    default:
      return state;
  }
};

export default searchBar;
