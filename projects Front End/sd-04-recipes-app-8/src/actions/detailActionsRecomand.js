import getRecipesAPI from '../services/theMealDBAPI';

export const REQUEST_DETAIL_RECOMAND_API = 'REQUEST_DETAIL_RECOMAND_API';
export const RECEIVE_DETAIL_RECOMAND_API_SUCCESS =
  'RECEIVE_DETAIL_RECOMAND_API_SUCCESS';
export const RECEIVE_DETAIL_RECOMAND_API_FAILURE =
  'RECEIVE_DETAIL_RECOMAND_API_FAILURE';

const requestDetailRecomadAPI = () => ({
  type: REQUEST_DETAIL_RECOMAND_API,
});

const requestDetailRecomandAPISuccess = (data) => ({
  type: RECEIVE_DETAIL_RECOMAND_API_SUCCESS,
  payload: data,
});

const receiveDetailRecomandAPIFailure = (error) => ({
  type: RECEIVE_DETAIL_RECOMAND_API_FAILURE,
  payload: error,
});

function callAPI(searchSetting) {
  let url = '';
  switch (searchSetting.searchOption) {
    case 'recommendation_drink':
      url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      break;
    case 'recommendation_food':
      url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      break;
    default:
      url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  }
  return getRecipesAPI(url);
}

export default function FetchDetailRecomandAPI(searchSetting) {
  return (dispatch) => {
    dispatch(requestDetailRecomadAPI);
    return callAPI(searchSetting).then(
      (data) => dispatch(requestDetailRecomandAPISuccess(data)),
      (error) => dispatch(receiveDetailRecomandAPIFailure(error.message)),
    );
  };
}
