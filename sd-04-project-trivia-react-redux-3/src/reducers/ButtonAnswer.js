import {
  CHANGE_BORDER_COLOR,
  DISABLE_ANSWER_BUTTON,
  ENABLE_NEXT_BUTTON,
} from '../actions/buttonAnswer';

const initialState = {
  borderColorChange: false,
  answerButtonEnable: false,
  nextButtonEnable: false,
};

export default (state = initialState, { type }) => {
  switch (type) {
    case CHANGE_BORDER_COLOR:
      return { ...state, borderColorChange: true };
    case DISABLE_ANSWER_BUTTON:
      return { ...state, answerButtonEnable: true };
    case ENABLE_NEXT_BUTTON:
      return { ...state, nextButtonEnable: true };
    default:
      return state;
  }
};
