import getRecipesAPI from '../services/theMealDBAPI';

export const REQUEST_DETAIL_ID_API = 'REQUEST_DETAIL_ID_API';
export const RECEIVE_DETAIL_ID_API_SUCCESS = 'RECEIVE_DETAIL_ID_API_SUCCESS';
export const RECEIVE_DETAIL_ID_API_FAILURE = 'RECEIVE_DETAIL_ID_API_FAILURE';

const requestDetailIdAPI = () => ({
  type: REQUEST_DETAIL_ID_API,
});

const requestDetailIdAPISuccess = (data) => ({
  type: RECEIVE_DETAIL_ID_API_SUCCESS,
  payload: data,
});

const receiveDetailIdAPIFailure = (error) => ({
  type: RECEIVE_DETAIL_ID_API_FAILURE,
  payload: error,
});

function callAPI(searchSetting, typepage) {
  const pageType = typepage === '/comidas' ? 'themeal' : 'thecocktail';
  const url = `https://www.${pageType}db.com/api/json/v1/1/lookup.php?i=${searchSetting.searchedValue}`;
  return getRecipesAPI(url);
}

export default function FetchDetailIdAPI(searchSetting) {
  return (dispatch, state) => {
    const {
      updateLocation: { currentLocation: typepage },
    } = state();
    dispatch(requestDetailIdAPI);
    return callAPI(searchSetting, typepage).then(
      (data) => dispatch(requestDetailIdAPISuccess(data)),
      (error) => dispatch(receiveDetailIdAPIFailure(error.message)),
    );
  };
}
