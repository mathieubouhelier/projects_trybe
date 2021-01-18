import {
  REQUEST_RESET_FETCH_INGREDIENTS_STATE,
  REQUEST_RESET_INGREDIENTS_STATE,
  REQUEST_INGREDIENTS_API,
  RECEIVE_INGREDIENTS_API_SUCCESS,
  RECEIVE_INGREDIENTS_API_FAILURE,
} from '../actions/ingredientsActions';

const INITIAL_STATE = {
  isFetchingIngredients: false,
  ingredients: [],
  errorAPIIngredients: '',
};

export default (state = INITIAL_STATE, { type, payload }) => {
  console.log('Action', type, payload);
  switch (type) {
    case REQUEST_RESET_FETCH_INGREDIENTS_STATE:
      return { ...state, isFetchingIngredients: false };
    case REQUEST_RESET_INGREDIENTS_STATE:
      return { ...state, ingredients: [] };
    case REQUEST_INGREDIENTS_API:
      return { ...state, isFetchingIngredients: true };
    case RECEIVE_INGREDIENTS_API_SUCCESS:
      return {
        ...state,
        isFetchingIngredients: false,
        ingredients: payload[Object.keys(payload)],
      };
    case RECEIVE_INGREDIENTS_API_FAILURE:
      return { ...state, isFetchingIngredients: false, error: payload };
    default:
      return state;
  }
};
