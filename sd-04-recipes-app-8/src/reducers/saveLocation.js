import { CHANGE_LOCATION } from '../actions/index';

const INITIAL_STATE = {
  currentLocation: '',
};

const updateLocation = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_LOCATION:
      return {
        ...state,
        currentLocation: action.payload,
      };
    default:
      return state;
  }
};

export default updateLocation;
