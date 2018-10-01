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

  const res = doesModifyProject(action);

  if (doesModifyProject(action)) {
    const updatedSaveProjectTrigger = action.type === actions.UPDATE_MODULE_FILL
      ? state.saveProjectTrigger
      : !state.saveProjectTrigger;

    return {
      ...state,
      saveProjectTrigger: updatedSaveProjectTrigger,
      updateThumbnailTrigger: !state.updateThumbnailTrigger,
    };
  }

  return state;
};
