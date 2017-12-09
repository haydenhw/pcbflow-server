import * as actions from 'actions/indexActions';

import { doesModifyBoard } from 'helpers/doesModifyBoard';

const defaultboardSpecs = {
  x: 10,
  y: 10,
  width: 600,
  height: 300,
  // savedThumbnail: null,
  // tempThumbnail: null,
  updateThumbnailTrigger: false,
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
        stroke: action.boardStroke,
      };
      break;
    case actions.UPDATE_BOARD_THUMBNAIL:
      return {
        ...state,
        tempThumbnail: action.thumbnail,
      };
    break;
    case actions.UPDATE_PROJECT_SUCCESS:
      return {
        ...state,
        savedThumbnail: state.tempThumbnail,
      };
    break;
    case actions.FECTCH_PROJECT_BY_ID_SUCCESS:
      const boardSpecs = action.project.boardSpecs;
      const { x, y, width, height, thumbnail } = boardSpecs;

      return {
        ...state,
        x,
        y,
        width,
        height,
        tempThumbnail: thumbnail,
        savedThumbnail: thumbnail,
      };
      break;
  }

  if (doesModifyBoard(action)) {
    return {
      ...state,
      updateThumbnailTrigger: !state.updateThumbnailTrigger,
    };
  }

  return state;
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
