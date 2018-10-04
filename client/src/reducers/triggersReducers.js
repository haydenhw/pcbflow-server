import * as actions from '../actions/indexActions';
import doesModifyProject from 'helpers/doesModifyProject';

const defaultState = {
  saveProjectTrigger: false,
  updateThumbnailTrigger: false,
}

export const triggers = (state = false, action) => {
  switch (action.type) {
    case actions.TOGGLE_HAS_UNSAVED_CHANGES:
      return false;
  }


  if (doesModifyProject(action)) {
    return {
      ...state,
      saveProjectTrigger: !state.saveProjectTrigger,
      updateThumbnailTrigger: !state.updateThumbnailTrigger,
    };
  }

  return state;
};
