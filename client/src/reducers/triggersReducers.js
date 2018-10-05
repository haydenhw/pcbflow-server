import * as actions from '../actions/indexActions';
import doesModifyProject from 'helpers/doesModifyProject';

const defaultState = {
  saveProjectTrigger: false,
  updateThumbnailTrigger: false,
}

export const triggers = (state = defaultState, action) => {
  if (doesModifyProject(action)) {
    return {
      ...state,
      saveProjectTrigger: !state.saveProjectTrigger,
      updateThumbnailTrigger: !state.updateThumbnailTrigger,
    };
  }

  return state;
};
