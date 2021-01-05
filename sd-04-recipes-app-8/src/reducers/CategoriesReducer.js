import {
  REQUEST_CATEGORIESAPI,
  RECEIVE_CATEGORIESAPI_SUCCESS,
  RECEIVE_CATEGORIESAPI_FAILURE,
  REQUEST_RESET_FETCH_CATEGORIES_STATE,
  REQUEST_RESET_CATEGORIES_STATE,
} from '../actions/categoriesdbActions';

const initialState = {
  isFetchingCategories: false,
  categories: [],
  errorAPICategories: '',
};

export default (state = initialState, { type, payload }) => {
  console.log('Action', type, payload);
  switch (type) {
    case REQUEST_RESET_FETCH_CATEGORIES_STATE:
      return { ...state, isFetching: false };
    case REQUEST_RESET_CATEGORIES_STATE:
      return { ...state, categories: [] };
    case REQUEST_CATEGORIESAPI:
      return { ...state, isFetching: true };
    case RECEIVE_CATEGORIESAPI_SUCCESS:
      return {
        ...state,
        isFetching: false,
        categories: payload[Object.keys(payload)],
      };
    case RECEIVE_CATEGORIESAPI_FAILURE:
      return { ...state, isFetching: false, error: payload };
    default:
      return state;
  }
};
