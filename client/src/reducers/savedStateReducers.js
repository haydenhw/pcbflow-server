import * as actions from '../actions/indexActions';

export const hasUnsavedChanges = (state = false, action) => {
  switch (action.type) {
    case actions.PUSH_NEW_MODULE:
    case actions.UPDATE_MODULE_POSITION:
    case actions.ROTATE_SELECTED_MODULE:
    case actions.UPDATE_ANCHOR_POSITIONS:
    case actions.UPDATE_BOARD_POSITION:
    case actions.UPDATE_BOARD_DIMENSIONS:
      return true;
    break;
    case actions.TOGGLE_HAS_UNSAVED_CHANGES:
      return !state;
    default:
      return state;
  }
  if (isBoardAlteration(action.type)) {

  }
};

//function compares a recently dispatched actions to a list of actions that modify
//isProjectAlteringAction


psuedoSwitch(action.type, () => {

})
