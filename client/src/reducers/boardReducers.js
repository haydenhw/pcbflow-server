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
    case actions.FECTCH_PROJECT_BY_ID_SUCCESS:
    case actions.POST_PROJECT_SUCCESS:
      const board = action.project.board;
      const { x, y, width, height } = board;

      return {
        ...state,
        x,
        y,
        width,
        height,
      };
    default:
      return state;
  }
};
