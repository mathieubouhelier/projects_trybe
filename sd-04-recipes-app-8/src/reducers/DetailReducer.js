import {
  REQUEST_DETAIL_RECOMAND_API,
  RECEIVE_DETAIL_RECOMAND_API_SUCCESS,
  RECEIVE_DETAIL_RECOMAND_API_FAILURE,
} from '../actions/detailActionsRecomand';
import {
  REQUEST_DETAIL_ID_API,
  RECEIVE_DETAIL_ID_API_SUCCESS,
  RECEIVE_DETAIL_ID_API_FAILURE,
} from '../actions/detailActionsId';

import {
  REQUEST_RANDOM_API,
  RECEIVE_RANDOM_API_SUCCESS,
  RECEIVE_RANDOM_API_FAILURE,
} from '../actions/RandomActions';

const initialState = {
  isFetchingIdDetail: false,
  id: [],
  recomendation: [],
  error_id: '',
  error_recomendation: '',
  error_random: '',
  isFetchingRandom: false,
};

export default (state = initialState, { type, payload }) => {
  console.log('Action', type, payload);
  switch (type) {
    case REQUEST_DETAIL_ID_API:
      return { ...state, isFetchingIdDetail: true };
    case REQUEST_DETAIL_RECOMAND_API:
      return { ...state, isFetchingRecomandDetail: true };
    case RECEIVE_DETAIL_RECOMAND_API_SUCCESS:
      return {
        ...state,
        isFetchingRecomandDetail: false,
        recomendation: payload[Object.keys(payload)],
      };
    case RECEIVE_DETAIL_RECOMAND_API_FAILURE:
      return {
        ...state,
        isFetchingRecomandDetail: false,
        error_recomendation: payload,
      };
    case RECEIVE_DETAIL_ID_API_SUCCESS:
      return {
        ...state,
        isFetchingIdDetail: false,
        id: payload[Object.keys(payload)],
      };
    case RECEIVE_DETAIL_ID_API_FAILURE:
      return {
        ...state,
        isFetchingIdDetail: false,
        error_id: payload,
      };
    case REQUEST_RANDOM_API:
      return {
        ...state,
        isFetchingRandom: true,
      };
    case RECEIVE_RANDOM_API_SUCCESS:
      return {
        ...state,
        isFetchingRandom: false,
        id: payload[Object.keys(payload)],
      };
    case RECEIVE_RANDOM_API_FAILURE:
      return {
        ...state,
        isFetchingRandom: false,
        error_random: payload,
      };
    default:
      return state;
  }
};
