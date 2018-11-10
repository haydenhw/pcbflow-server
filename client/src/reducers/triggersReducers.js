import * as actions from '../actions/indexActions';
import doesModifyProject from 'helpers/doesModifyProject';

const defaultState = {
  saveProjectTrigger: false,
  updateAnchorTrigger: false,
}

export const triggers = (state = defaultState, action) => {
    switch(action.type) {
      case actions.TRIGGER_ANCHOR_UPDATE:
        return {
          ...state,
          updateAnchorTrigger: !state.updateAnchorTrigger,
        };
      default:
        break;
    }

  if (doesModifyProject(action)) {
    return {
      ...state,
      saveProjectTrigger: !state.saveProjectTrigger,
    };
  }

  return state;
};
