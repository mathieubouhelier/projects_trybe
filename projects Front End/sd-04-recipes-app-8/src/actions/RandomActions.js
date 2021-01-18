import getRecipesAPI from '../services/theMealDBAPI';

export const REQUEST_RANDOM_API = 'REQUEST_RANDOM_API';
export const RECEIVE_RANDOM_API_SUCCESS = 'RECEIVE_RANDOM_API_SUCCESS';
export const RECEIVE_RANDOM_API_FAILURE = 'RECEIVE_RANDOM_API_FAILURE';

const requestRandomAPI = () => ({
  type: REQUEST_RANDOM_API,
});

const requestRandomAPISuccess = (data) => ({
  type: RECEIVE_RANDOM_API_SUCCESS,
  payload: data,
});

const receiveRandomAPIFailure = (error) => ({
  type: RECEIVE_RANDOM_API_FAILURE,
  payload: error,
});

function callAPI(typepage) {
  const pageType = typepage === '/comidas' ? 'themeal' : 'thecocktail';
  const url = `https://www.${pageType}db.com/api/json/v1/1/random.php`;
  return getRecipesAPI(url);
}

export default function FetchRandomAPI(typepage) {
  return (dispatch) => {
    dispatch(requestRandomAPI());
    return callAPI(typepage).then(
      (data) => dispatch(requestRandomAPISuccess(data)),
      (error) => dispatch(receiveRandomAPIFailure(error.message)),
    );
  };
}
