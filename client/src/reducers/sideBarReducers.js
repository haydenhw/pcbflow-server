import * as actions from 'actions/indexActions';

const defaultState = {
  show: false,
  showAllIcons: false,
}

export const sideBar = (state = defaultState, action) => {
  switch (action.type) {
    case actions.UPDATE_SHOW_ALL_ICONS:
      return {
        ...state,
        showAllIcons: action.bool,
      }
    case actions.UPDATE_CLICKED_MODULE:
      return {
        ...state,
      showAllIcons: false,
      }
    case actions.TOGGLE_SIDEBAR:
      return {
        ...state,
        show: !state.show,
      }
    default:
      return state;
  }
};
