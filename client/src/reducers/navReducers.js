import * as actions from 'actions/indexActions';
import { modulesData } from '../config/modulesData';

const defaultState = {
  showSavingMessage: false,
}

export const nav = (state = defaultState, action) => {
  switch (action.type) {
    case actions.TOGGLE_SAVING_MESSAGE:
      return {
        showSavingMessage: !state.showSavingMessage,
      };
    default:
      return state;
  }
};
