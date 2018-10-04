import * as actions from 'actions/indexActions';


export const activeModules = (state = [], action) => {
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
}
