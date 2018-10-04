import * as actions from '../actions/indexActions';
import rotateAboutCenter from 'helpers/rotateAboutCenter';

const defaultState =  {
  dragging: null,
  hovered: null,
  clicked: null,
}

export const modules = (state = defaultState, action) => {
  switch (action.type) {
    case actions.UPDATE_DRAGGING_MODULE:
      return {
        ...state,
        dragging: action.moduleData,
      }
  }

  return state;
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

export const clickedModuleIndex = (state = null, action) => {
  switch (action.type) {
    case actions.UPDATE_LAST_CLICKED_MODULE:
      return action.index;
    default:
      return state;
  }
};
