import {
  REQUEST_TOKEN, RECEIVE_TOKEN_SUCCESS, RECEIVE_TOKEN_FAILURE,
} from '../types/typeToken';

const initialState = {
  tokenIsFetching: false,
  token: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null,
};

export default (state = initialState, { type, payload }) => {
  console.log('type', type);
  console.log('pay', payload);
  switch (type) {
    case REQUEST_TOKEN:
      return { ...state, tokenIsFetching: true };
    case RECEIVE_TOKEN_SUCCESS:
      return { ...state, tokenIsFetching: false, token: payload };
    case RECEIVE_TOKEN_FAILURE:
      return { ...state, tokenIsFetching: false, error: payload };
    default:
      return state;
  }
};
