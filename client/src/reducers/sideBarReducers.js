import * as actions from 'actions/indexActions';
import { modulesData } from '../config/modulesData';


export const showAllIcons = (state = false, action) => {
  switch (action.type) {
    case actions.TOGGLE_SHOW_ALL_ICONS:
      return bool;
    default:
      return state;
  }
};

export const shouldRenderSideBar = (state = false, action) => {
  switch (action.type) {
    case actions.TOGGLE_SHOULD_RENDER_SIDEBAR:
      return action.bool;
    default:
      return state;
  }
};

export const moduleData = (state = modulesData, action) => {
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
