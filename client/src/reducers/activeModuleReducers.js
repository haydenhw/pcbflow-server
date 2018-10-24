import * as actions from 'actions/indexActions';

export const activeModules = (state = [], action) => {
  if (action.type) {
    switch (action.type) {
      // update entity
      case actions.ROTATE_HOVERED_MODULE:
        const {
          rotation,
          boundToSideIndex,
          parentGroupX,
          parentGroupY,
          innerGroupX,
          innerGroupY,
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

      // update entity
      case actions.DELETE_HOVERED_MODULE:
        const newState = [
          ...state.slice(0, action.moduleIndex),
          ...state.slice(action.moduleIndex + 1),
        ];
        return newState;

      default:
        return state;
    }
  }
}
