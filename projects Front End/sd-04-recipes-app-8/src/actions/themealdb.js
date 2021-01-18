import getRecipesAPI from '../services/theMealDBAPI';

export const REQUEST_THEMEALAPI = 'REQUEST_THEMEALAPI';
export const RECEIVE_THEMEALAPI_SUCCESS = 'RECEIVE_THEMEALAPI_SUCCESS';
export const RECEIVE_THEMEALAPI_FAILURE = 'RECEIVE_THEMEALAPI_FAILURE';
export const REQUEST_RESET_FETCH_STATE = 'REQUEST_RESET_FETCH_STATE';
export const REQUEST_RESET_RECIPES_STATE = 'REQUEST_RESET_RECIPES_STATE';

export const FETCH_BY_INGREDIENT = 'FETCH_BY_INGREDIENT';
export const CHANGE_FETCH_BY_INGREDIENT = 'CHANGE_FETCH_BY_INGREDIENT';

export const requestResetAPI = () => ({
  type: REQUEST_RESET_FETCH_STATE,
});

export const requestResetRecipes = () => ({
  type: REQUEST_RESET_RECIPES_STATE,
});

export const fetchByIngredient = () => ({
  type: FETCH_BY_INGREDIENT,
});

export const changeFetchByIngredient = () => ({
  type: CHANGE_FETCH_BY_INGREDIENT,
});

const requestThemealAPI = () => ({
  type: REQUEST_THEMEALAPI,
});

const requestThemealAPISuccess = (data) => ({
  type: RECEIVE_THEMEALAPI_SUCCESS,
  payload: data,
});

const receiveThemealAPIFailure = (error) => ({
  type: RECEIVE_THEMEALAPI_FAILURE,
  payload: error,
});

function callAPI(searchSetting, typepage) {
  const pageType = typepage === '/comidas' ? 'themeal' : 'thecocktail';
  let url = '';
  switch (searchSetting.searchOption) {
    case 'ingredient':
      url = `https://www.${pageType}db.com/api/json/v1/1/filter.php?i=${searchSetting.searchedValue}`;
      break;
    case 'name':
      url = `https://www.${pageType}db.com/api/json/v1/1/search.php?s=${searchSetting.searchedValue}`;
      break;
    case 'firstLetter':
      url = `https://www.${pageType}db.com/api/json/v1/1/search.php?f=${searchSetting.searchedValue}`;
      break;
    case 'category':
      url = `https://www.${pageType}db.com/api/json/v1/1/filter.php?c=${searchSetting.searchedValue}`;
      break;
    case 'area':
      url = `https://www.${pageType}db.com/api/json/v1/1/filter.php?a=${searchSetting.searchedValue}`;
      break;
    default:
      url = `https://www.${pageType}db.com/api/json/v1/1/search.php?s=${searchSetting.searchedValue}`;
  }
  return getRecipesAPI(url);
}

export default function FetchThemealAPI(searchSetting) {
  requestThemealAPI();
  return (dispatch, state) => {
    const {
      updateLocation: { currentLocation: typepage },
    } = state();
    dispatch(requestThemealAPI());
    return callAPI(searchSetting, typepage).then(
      (data) => dispatch(requestThemealAPISuccess(data)),
      (error) => dispatch(receiveThemealAPIFailure(error.message)),
    );
  };
}
