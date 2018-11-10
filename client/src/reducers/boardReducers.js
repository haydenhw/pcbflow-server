import * as actions from 'actions/indexActions';

export const board = (state = {}, action) => {
  switch (action.type) {
    case actions.UPDATE_ANCHOR_POSITIONS:
      return {
        ...state,
        checkCollisionTrigger: !state.checkCollisionTrigger,
      };
    case actions.UPDATE_BOARD_STROKE:
      return {
        ...state,
        stroke: action.boardStroke,
      };
    default:
      return state;
  }
};
