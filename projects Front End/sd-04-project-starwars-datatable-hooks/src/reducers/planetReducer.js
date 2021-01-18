import {
  SEARCH_BEGIN,
  SEARCH_SUCCESS,
  SEARCH_ERROR,
} from '../actions/planetActions';

const initialState = {
  isLoading: true,
  data: {},
};

function planetReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case SEARCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.data,
      };
    case SEARCH_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
}

export default planetReducer;
