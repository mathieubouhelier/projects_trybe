import { getToken } from '../services/triviaAPI';
import { REQUEST_TOKEN, RECEIVE_TOKEN_SUCCESS, RECEIVE_TOKEN_FAILURE } from '../types/typeToken';

const requestToken = () => ({
  type: REQUEST_TOKEN,
});

const requestTokenSuccess = ({ token }) => ({
  type: RECEIVE_TOKEN_SUCCESS,
  payload: token,
});

const receiveTokenFailure = (error) => ({
  type: RECEIVE_TOKEN_FAILURE,
  payload: error,
});

export default function fetchToken() {
  return (dispatch, state) => {
    console.log('fsdfsdf', state());
    dispatch(requestToken());
    return getToken()
      .then(
        (data) => dispatch(requestTokenSuccess(data)),
        (error) => dispatch(receiveTokenFailure(error.message)),
      );
  };
}
