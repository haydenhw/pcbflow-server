import * as actions from 'actions/indexActions';

const defaultState = {
  isTutorialModeActive: false,
  shouldRenderModal: true, 
  disabledIconExceptions: null,
  step: 3,
}

export const tutorial = (state = defaultState, action) => {
  switch (action.type) {
    case actions.TOGGLE_TUTORIAL_MODE:
      return {
        ...state,
        isTutorialModeActive: !state.isTutorialModeActive
      };
    case actions.TOGGLE_SHOULD_RENDER_MODAL:
      return {
        ...state,
        shouldRenderModal: !state.shouldRenderModal
      };
    case actions.UPDATE_DISABLED_ICON_EXCEPTIONS:
      return {
        ...state,
        disabledIconExceptions: action.exceptions
      };
    case actions.INCREMENT_STEP:
      return {
        ...state,
        step: state.step + 1,
      };
    case actions.DECREMENT_STEP:
      return {
        ...state,
        step: state.step - 1,
      };
    default:
      return state;
  }
};

