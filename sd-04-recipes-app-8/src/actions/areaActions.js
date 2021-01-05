import getRecipesAPI from '../services/theMealDBAPI';

export const REQUEST_AREA_API = 'REQUEST_AREA_API';
export const RECEIVE_AREA_API_SUCCESS = 'RECEIVE_AREA_API_SUCCESS';
export const RECEIVE_AREA_API_FAILURE = 'RECEIVE_AREA_API_FAILURE';
export const REQUEST_RESET_FETCH_AREA_STATE = 'REQUEST_RESET_FETCH_AREA_STATE';
export const REQUEST_RESET_AREA_STATE = 'REQUEST_RESET_AREA_STATE';

export const requestResetAreaAPI = () => ({
  type: REQUEST_RESET_FETCH_AREA_STATE,
});

export const requestResetArea = () => ({
  type: REQUEST_RESET_AREA_STATE,
});

const requestAreaAPI = () => ({
  type: REQUEST_AREA_API,
});

const requestAreaAPISuccess = (data) => ({
  type: RECEIVE_AREA_API_SUCCESS,
  payload: data,
});

const receiveAreaAPIFailure = (error) => ({
  type: RECEIVE_AREA_API_FAILURE,
  payload: error,
});

function callAPI() {
  const url = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  return getRecipesAPI(url);
}

export default function FetchAreaAPI() {
  requestAreaAPI();
  return (dispatch) => {
    dispatch(requestAreaAPI());
    return callAPI().then(
      (data) => dispatch(requestAreaAPISuccess(data)),
      (error) => dispatch(receiveAreaAPIFailure(error.message)),
    );
  };
}
