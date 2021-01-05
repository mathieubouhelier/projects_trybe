import {
  REQUEST_FAVORITE_FETCHING,
  RECEIVE_FAVORITE_FETCHING_SUCCESS,
} from '../actions/favoriteAction';

const initialState = {
  favoriteListFetching: true,
};

export default (state = initialState, { type, payload }) => {
  console.log('Action Favorites Reducer', type, payload);
  switch (type) {
    case REQUEST_FAVORITE_FETCHING:
      return { ...state, favoriteListFetching: !state.favoriteListFetching };
    case RECEIVE_FAVORITE_FETCHING_SUCCESS:
      return { ...state };
    default:
      return state;
  }
};
