import * as actions from '../actions/indexActions';

const defaultState = {
  hasUnsavedChanges: false,
};

export const hasUnsavedChanges = (state = defaultState, action) => {
  switch (action.type) {
    case actions.PUSH_TO_CURRENT_PROJECT_MODULES:
    case actions.UPDATE_MODULE_POSITION:
    case actions.ROTATE_SELECTED_MODULE:
    case actions.UPDATE_ANCHOR_POSITIONS:
    case actions.UPDATE_BOARD_POSITION:
    case actions.UPDATE_BOARD_DIMENSIONS:
      return {
        hasUnsavedChanges: true,
      };
      break;
    case actions.TOGGLE_HAS_UNSAVED_CHANGES:
      return {
        hasUnsavedChanges: !state.hasUnsavedChanges,
      };
    default:
      return state;
  }
};
