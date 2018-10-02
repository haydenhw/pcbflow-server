import * as actions from '../actions/indexActions';
import rotateAboutCenter from 'helpers/rotateAboutCenter';

// export const moduleList = (state = [], action) => {
//   if (action.type === actions.FETCH_MODULES_SUCCESS) {
//     return {
//       modules: action.modules,
//     };
//   }
//
//   return state;
// };
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

export const hoveredModule = (state = {}, action) => {
  switch (action.type) {
    case actions.UPDATE_HOVERED_MODULE:
      return action.moduleData;
      break;
    case actions.UPDATE_MODULE_POSITION:
      const { x, y } = action.modulePosition;
      return {
        ...state,
        x,
        y,
      };
      break;
    case actions.ROTATE_HOVERED_MODULE:
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

      return {
        ...state,
        boundToSideIndex,
        innerGroupX,
        innerGroupY,
        rotation,
        x: parentGroupX,
        y: parentGroupY,
      };
    default:
      return state;
  }
};

export const lastClickedModuleIndex = (state = null, action) => {
  switch (action.type) {
    case actions.UPDATE_LAST_CLICKED_MODULE:
      return action.index;
    default:
      return state;
  }
};

export const activeProjectModules = (state = [], action) => {
  if (action.type) {
    switch (action.type) {
      case actions.POST_PROJECT_SUCCESS:
      case actions.FECTCH_PROJECT_BY_ID_SUCCESS:
        return action.project.modules;
        break;

      case actions.PUSH_NEW_MODULE:
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

      case actions.UPDATE_MODULE_STROKE:
        return state.map((module, i) => {
          const { stroke, index } = action.moduleStroke;
          const updatedModuleProps = {
            ...module,
            stroke,
          };
          return i === index ? updatedModuleProps : module;
        });
        break;

      case actions.UPDATE_MET_DEPENDECIES:
        return state.map((module, i) => {
          const { metDependencies, index } = action.metDependencies;
          const updatedModuleProps = {
            ...module,
            metDependencies,
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

      case actions.ROTATE_HOVERED_MODULE:
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

      case actions.DELETE_HOVERED_MODULE:
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
