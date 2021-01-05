export const REQUEST_FAVORITE_FETCHING = 'REQUEST_FAVORITE_FETCHING';
export const RECEIVE_FAVORITE_FETCHING_SUCCESS = 'RECEIVE_FAVORITE_FETCHING_SUCCESS';

export const requestFavoriteFetching = () => ({
  type: REQUEST_FAVORITE_FETCHING,
});

export const favoriteFetchingSuccess = () => ({
  type: RECEIVE_FAVORITE_FETCHING_SUCCESS,
});
