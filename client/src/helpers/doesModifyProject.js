import * as actions from 'actions/indexActions';
import * as types from '../constants/actionTypes';

export default function doesModifyProject(action) {
  switch(action.type) {
    case types.ENTITY_UPDATE:
    case types.ENTITY_CREATE:
    case types.ENTITY_DELETE:
    case actions.PUSH_NEW_MODULE:
    case actions.UPDATE_ANCHOR_POSITIONS:
    case actions.UPDATE_BOARD:
    case actions.UPDATE_MODULE_POSITION:
    case actions.UPDATE_PROJECT_NAME:
    case actions.UNDO:
    case actions.REDO:
      return true;
    default:
      return false;
  }
}
