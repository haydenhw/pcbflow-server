mport * as actions from '../actions/indexActions';

const defaultMouseEvents = {
  isMouseOverModule: false,
  isMouseDownOnIcon: false,
  isMouseDown: false,
};

export const mouseEvents = (state = defaultMouseEvents, action) => {
  switch (action.type) {
    case actions.MOUSE_DOWN_ON_ICON:
      return {
        ...state,
        isMouseDownOnIcon: action.isDown,
      };
      break;

    case actions.TOGGLE_IS_MOUSE_DOWN:
      return {
        ...state,
        isMouseDown: action.isDown,
      };
      break;

    case actions.TOGGLE_IS_MOUSE_OVER_MODULE:
      return {
        ...state,
        isMouseOverModule: action.isOver,
      };
    default:
      return state;
  }
};
