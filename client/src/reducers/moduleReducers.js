import * as actions from '../actions/indexActions';
import rotateAboutCenter from 'helpers/rotateAboutCenter';

export const moduleList = (state = [], action) => {
  if (action.type === actions.FETCH_MODULES_SUCCESS) {
    return {
      modules: action.modules,
    };
  }
  
  return state;
};

export const draggingModule = (state = {}, action) => {
  switch (action.type) {
    case actions.CHANGE_DRAGGING_MODULE:
      return action.moduleData;
      break;

    case actions.UPDATE_MODULE_IMAGE:
      const { imageNode } = action.moduleData;
      return ({
        ...state,
        imageNode,
      });
    default:
      return state;
  }
};

export const selectedModule = (state = {}, action) => {
  switch (action.type) {
    case actions.UPDATE_SELECTED_MODULE:
      return action.moduleData;
      break;
    case actions.UPDATE_MODULE_POSITION:
      console.log(state.x, state.y)
      return {
        ...state,
        x: action.x,
        y: action.y
      };
      break;

    default:
      return state;
  }
};

export const moduleBank = (state = [], action) => {
  switch (action.type) {
    case actions.FECTCH_PROJECT_BY_ID_SUCCESS:
      return action.project.moduleBank;
      break;

    default:
      return state;
  }
};

export const currentProjectModules = (state = [], action) => {
  if (action.type) {
    switch (action.type) {
      case actions.FECTCH_PROJECT_BY_ID_SUCCESS:
        return action.project.modules;
        break;

      case actions.PUSH_TO_CURRENT_PROJECT_MODULES:
        return [...state, action.module];
        break;

      case actions.UPDATE_MODULE_POSITION:
        return state.map((module, i) => {
          const { x, y, index } = action.modulePosition;
          const updatedModuleProps = {
            ...module,
            x,
            y,
          };
          return i === index ? updatedModuleProps : module;
        });
        break;

      case actions.UPDATE_MODULE_IMAGE:
        return state.map((module, i) => {
          const { imageNode, index } = action.moduleData;
          const updatedModuleProps = {
            ...module,
            imageNode,
          };

          return i === index ? updatedModuleProps : module;
        });
        break;

      case actions.ROTATE_SELECTED_MODULE:

        const {
          rotation,
          boundToSideIndex,
          parentGroupX,
          parentGroupY,
          innerGroupX,
          innerGroupY,
          width,
          height,
          index,
        } = action.rotationData;

        return state.map((module, i) => {
          const updatedModuleProps = {
            ...module,
            boundToSideIndex,
            innerGroupX,
            innerGroupY,
            rotation,
            x: parentGroupX,
            y: parentGroupY,
          };

          return i === index ? updatedModuleProps : module;
        });

      case actions.DELETE_SELECTED_MODULE:
        const newState = [
          ...state.slice(0, action.moduleIndex),
          ...state.slice(action.moduleIndex + 1),
        ];
        return newState;
        break;

      default:
        return state;
    }
  }
};
