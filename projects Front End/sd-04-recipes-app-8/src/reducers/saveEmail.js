import { SAVE_EMAIL } from '../actions/index';

const INITIAL_STATE = {
  email: '',
};

const saveEmail = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SAVE_EMAIL:
      return {
        ...state,
        email: action.payload,
      };
    default:
      return state;
  }
};

export default saveEmail;
