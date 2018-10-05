import * as actions from 'actions/indexActions';

export const showAllIcons = (state = false, action) => {
  switch (action.type) {
    case actions.UPDATE_SHOW_ALL_ICONS:
      return action.bool;
    case actions.UPDATE_LAST_CLICKED_MODULE:
      return false;
    default:
      return state;
  }
};

export const shouldRenderSideBar = (state = true, action) => {
  switch (action.type) {
    case actions.TOGGLE_SHOULD_RENDER_SIDEBAR:
      return action.bool;
    default:
      return state;
  }
};
