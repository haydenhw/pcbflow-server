import * as actions from 'actions/indexActions';
import { printModuleNames } from 'helpers/printModuleNames';

const defaultboardSpecs = {
  x: 10,
  y: 10,
  width: 600,
  height: 300,
  thumbnail: null,
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
      printModuleNames(action.thumbnail)
      return {
        ...state,
        thumbnail: action.thumbnail,
      };
    break;
    case actions.FECTCH_PROJECT_BY_ID_SUCCESS:
      const boardSpecs = action.project.boardSpecs;
      const { x, y, width, height, thumbnail } = boardSpecs;

      return {
        x,
        y,
        width,
        height,
        thumbnail,
      };
    break;
    case actions.FECTCH_PROJECT_BY_ID_SUCCESS:
    case actions.ROTATE_SELECTED_MODULE:
    case actions.UPDATE_MODULE_POSITION:
    case actions.PUSH_NEW_MODULE:
    case actions.DELETE_SELECTED_MODULE:
    return {
      ...state,
      updateThumbnailTrigger: !state.updateThumbnailTrigger
    }
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
