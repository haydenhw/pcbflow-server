import * as actions from '../actions/indexActions';
import doesModifyBoard from 'helpers/doesModifyBoard';

export const hasUnsavedChanges = (state = false, action) => {
  switch (action.type) {
    case actions.TOGGLE_HAS_UNSAVED_CHANGES:
      return !state;
  }

  if (doesModifyBoard(action)) {
    return true;
  }

  return state;
};
