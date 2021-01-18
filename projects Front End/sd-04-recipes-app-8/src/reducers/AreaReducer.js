import {
  REQUEST_AREA_API,
  RECEIVE_AREA_API_SUCCESS,
  RECEIVE_AREA_API_FAILURE,
  REQUEST_RESET_FETCH_AREA_STATE,
  REQUEST_RESET_AREA_STATE,
} from '../actions/areaActions';

const INITIAL_STATE = {
  isFetchingArea: false,
  areas: [],
  errorAPIAreas: '',
};

export default (state = INITIAL_STATE, { type, payload }) => {
  console.log('Action', type, payload);
  switch (type) {
    case REQUEST_RESET_FETCH_AREA_STATE:
      return { ...state, isFetchingArea: false };
    case REQUEST_RESET_AREA_STATE:
      return { ...state, areas: [] };
    case REQUEST_AREA_API:
      return { ...state, isFetchingArea: true };
    case RECEIVE_AREA_API_SUCCESS:
      return {
        ...state,
        isFetchingArea: false,
        areas: payload[Object.keys(payload)],
      };
    case RECEIVE_AREA_API_FAILURE:
      return { ...state, isFetchingArea: false, error: payload };
    default:
      return state;
  }
};
