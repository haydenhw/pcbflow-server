import * as actions from 'actions/indexActions';

export default function doesModifyBoard(action) {
  switch(action.type) {
    case actions.DELETE_SELECTED_MODULE:
    case actions.FECTCH_PROJECT_BY_ID_SUCCESS:
    case actions.PUSH_NEW_MODULE:
    case actions.ROTATE_SELECTED_MODULE:
    case actions.UPDATE_ANCHOR_POSITIONS:
    case actions.UPDATE_BOARD_POSITION:
    case actions.UPDATE_MODULE_POSITION:
      return true;
    default:
      return false;
  }
}
