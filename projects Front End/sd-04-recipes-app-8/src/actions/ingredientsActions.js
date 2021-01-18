import getRecipesAPI from '../services/theMealDBAPI';

export const REQUEST_INGREDIENTS_API = 'REQUEST_INGREDIENTS_API';
export const RECEIVE_INGREDIENTS_API_SUCCESS =
  'RECEIVE_INGREDIENTS_API_SUCCESS';
export const RECEIVE_INGREDIENTS_API_FAILURE =
  'RECEIVE_INGREDIENTS_API_FAILURE';
export const REQUEST_RESET_FETCH_INGREDIENTS_STATE =
  'REQUEST_RESET_FETCH_INGREDIENTS_STATE';
export const REQUEST_RESET_INGREDIENTS_STATE =
  'REQUEST_RESET_INGREDIENTS_STATE';

export const requestResetIngredientsAPI = () => ({
  type: REQUEST_RESET_FETCH_INGREDIENTS_STATE,
});

export const requestResetIngredients = () => ({
  type: REQUEST_RESET_INGREDIENTS_STATE,
});

const requestIngredientsAPI = () => ({
  type: REQUEST_INGREDIENTS_API,
});

const requestIngredientsAPISuccess = (data) => ({
  type: RECEIVE_INGREDIENTS_API_SUCCESS,
  payload: data,
});

const receiveIngredientsAPIFailure = (error) => ({
  type: RECEIVE_INGREDIENTS_API_FAILURE,
  payload: error,
});

function callAPI(typepage) {
  const pageType = typepage === '/comidas' ? 'themeal' : 'thecocktail';
  const url = `https://www.${pageType}db.com/api/json/v1/1/list.php?i=list`;
  return getRecipesAPI(url);
}

export default function FetchIngredientsAPI() {
  requestIngredientsAPI();
  return (dispatch, state) => {
    const {
      updateLocation: { currentLocation: typepage },
    } = state();
    // typepage = '/comidas'; //MUST_REMOVE
    dispatch(requestIngredientsAPI());
    return callAPI(typepage).then(
      (data) => dispatch(requestIngredientsAPISuccess(data)),
      (error) => dispatch(receiveIngredientsAPIFailure(error.message)),
    );
  };
}
