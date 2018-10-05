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

export const moduleData = (state = moduleData, action) => {
  switch (action.type) {
    case actions.TOGGLE_HAS_TOOLTIP:
      return state.map((module) => {
        const updatedModuleProps = {
          ...module,
          hasTooltip: false,
        };
        return action.id === module.id ? updatedModuleProps : module;
      });
    default:
      return state;
  }
};
