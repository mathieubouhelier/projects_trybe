export const CHANGE_BORDER_COLOR = 'CHANGE_BORDER_COLOR';
export const DISABLE_ANSWER_BUTTON = 'DISABLE_ANSWER_BUTTON';
export const ENABLE_NEXT_BUTTON = 'ENABLE_NEXT_BUTTON';

export const buttonAnswer = () => ({
  type: CHANGE_BORDER_COLOR,
});

export const disableButton = () => ({
  type: DISABLE_ANSWER_BUTTON,
});

export const enableNextButton = () => ({
  type: ENABLE_NEXT_BUTTON,
});
