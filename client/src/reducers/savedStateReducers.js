import * as actions from '../actions/indexActions';
import doesModifyProject from 'helpers/doesModifyProject';

export const showSavingMessage = (state = false, action) => {
  switch (action.type) {
    case actions.TOGGLE_SAVING_MESSAGE:
      return false;
  }

  if (doesModifyProject(action)) {
    return true;
  }

  return state;
};
