import getRecipesAPI from '../services/theMealDBAPI';

export const REQUEST_CATEGORIESAPI = 'REQUEST_CATEGORIESAPI';
export const RECEIVE_CATEGORIESAPI_SUCCESS = 'RECEIVE_CATEGORIESAPI_SUCCESS';
export const RECEIVE_CATEGORIESAPI_FAILURE = 'RECEIVE_CATEGORIESAPI_FAILURE';
export const REQUEST_RESET_FETCH_CATEGORIES_STATE =
  'REQUEST_RESET_FETCH_CATEGORIES_STATE';
export const REQUEST_RESET_CATEGORIES_STATE = 'REQUEST_RESET_CATEGORIES_STATE';

export const requestResetCategoriesAPI = () => ({
  type: REQUEST_RESET_FETCH_CATEGORIES_STATE,
});

export const requestResetCategories = () => ({
  type: REQUEST_RESET_CATEGORIES_STATE,
});

const requestCategoriesAPI = () => ({
  type: REQUEST_CATEGORIESAPI,
});

const requestCategoriesAPISuccess = (data) => ({
  type: RECEIVE_CATEGORIESAPI_SUCCESS,
  payload: data,
});

const receiveCategoriesAPIFailure = (error) => ({
  type: RECEIVE_CATEGORIESAPI_FAILURE,
  payload: error,
});

function callAPI(typepage) {
  const pageType = typepage === '/comidas' ? 'themeal' : 'thecocktail';
  const url = `https://www.${pageType}db.com/api/json/v1/1/list.php?c=list`;
  return getRecipesAPI(url);
}

export default function FetchCategoriesAPI() {
  requestCategoriesAPI();
  return (dispatch, state) => {
    const {
      updateLocation: { currentLocation: typepage },
    } = state();
    // typepage = '/comidas'; //MUST_REMOVE
    dispatch(requestCategoriesAPI());
    return callAPI(typepage).then(
      (data) => dispatch(requestCategoriesAPISuccess(data)),
      (error) => dispatch(receiveCategoriesAPIFailure(error.message)),
    );
  };
}
