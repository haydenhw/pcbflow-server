import * as actions from '../actions/indexActions';

const defaultboardSpecs = {
  x: 10,
  y: 10,
  width: 600,
  height: 300
};

export const boardSpecs = (state = defaultboardSpecs, action) => {
  switch (action.type) {
    case actions.UPDATE_BOARD_DIMENSIONS:
      return {
        ...state,
        width: action.dimensions.width,
        height: action.dimensions.height,
      };
      break;
    case actions.UPDATE_BOARD_POSITION:
      return {
        ...state,
        x: action.position.x,
        y: action.position.y,
      };
      break;
    case actions.UPDATE_BOARD_STROKE:
      return {
        ...state,
        stroke: action.boardStroke
      };
      break;
    case actions.FECTCH_PROJECT_BY_ID_SUCCESS:
      const boardSpecs = action.project.boardSpecs;
      return {
        x: boardSpecs.x,
        y: boardSpecs.y,
        width: boardSpecs.width,
        height: boardSpecs.height,
      };
      break;
    case actions.UPDATE_BOARD_THUMBNAIL:
        //  console.log(action.thumbnail)
        //  console.log(state.thumbnail)
      return {
        ...state,
        thumbnail: action.thumbnail,
      };
      break;

    default:
      return state;
  }
};

const defaultAnchorPositions = {
  topLeft: { x: 0, y: 0 },
  topRight: { x: null, y: 0 },
  bottomLeft: { x: 0, y: null },
  bottomRight: { x: null, y: null },
};

export const anchorPositions = (state = defaultAnchorPositions, action) => {
  switch (action.type) {
    case actions.UPDATE_ANCHOR_POSITIONS:
      return action.positions;
      break;

    case actions.FECTCH_PROJECT_BY_ID_SUCCESS:
      return defaultAnchorPositions;
      break;
    default:
      return state;
  }
};
