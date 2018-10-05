import * as actions from '../actions/indexActions';
import rotateAboutCenter from 'helpers/rotateAboutCenter';

const defaultState =  {
  dragging: null,
  hovered: null,
  clicked: null,
}

function updateObject(oldObject, newValues) {
    return Object.assign({}, oldObject, newValues);
}

export const modules = (state = defaultState, action) => {
  switch (action.type) {
    case actions.UPDATE_DRAGGING_MODULE:
      return {
        ...state,
        dragging: action.moduleData,
      }
    case actions.UPDATE_HOVERED_MODULE:
      return {
        ...state,
        hovered: action.moduleData,
      }
    case actions.UPDATE_MODULE_POSITION:
      const { x, y } = action.modulePosition;
      const updatedModule =  updateObject(state.hovered, { x, y });

      return {
        ...state,
        hovered: updatedModule,
      };
    case actions.ROTATE_HOVERED_MODULE: {
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

      const updatedModule = updateObject(state.hovered, {
        boundToSideIndex,
        innerGroupX,
        innerGroupY,
        rotation,
        x: parentGroupX,
        y: parentGroupY,
      });

      return {
        ...state,
        hovered: updatedModule
      };
    }
  }
  return state;
};

export const clickedModuleIndex = (state = null, action) => {
  switch (action.type) {
    case actions.UPDATE_LAST_CLICKED_MODULE:
      return action.index;
    default:
      return state;
  }
};
