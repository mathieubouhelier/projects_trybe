import { CHANGE_BTN_START } from '../actions/index';

const INITIAL_STATE = {
  startRecipe: false,
};

const startRecipe = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_BTN_START:
      return {
        ...state,
        startRecipe: !state.startRecipe,
      };
    default:
      return state;
  }
};

export default startRecipe;
