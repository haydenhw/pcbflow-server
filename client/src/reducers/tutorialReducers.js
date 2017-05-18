import * as actions from 'actions/indexActions';

const defaultState = {
  isTutorialModeActive: false,
  disabledIconExceptions: null,
  tutorialStep: 0
}

export const tutorial = (state = defaultState, action) => {
  switch (action.type) {
    case actions.TOGGLE_TUTORIAL_MODE:
      return {
        ...state,
        isTutorialModeActive: !state.isTutorialModeActive
      };
    case actions.UPDATE_DISABLED_ICON_EXCEPTIONS:
      return {
        ...state,
        disabledIconExceptions: action.exceptions
      };
    case actions.INCREMENT_TUTORIAL_STEP:
      return {
        ...state,
        tutorialStep: state.tutorialStep + 1,
      };
    case actions.DECREMENT_TUTORIAL_STEP:
      return {
        ...state,
        tutorialStep: state.tutorialStep + 1,
      };
    default:
      return state;
  }
};

