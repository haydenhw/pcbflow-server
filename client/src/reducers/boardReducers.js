import * as actions from 'actions/indexActions';

import doesModifyProject from 'helpers/doesModifyProject';

const defaultboardSpecs = {
  height: 300,
  width: 600,
  x: 100,
  y: 100,
  checkCollisionTrigger: false,
  // *move this to projects reducer or delete if no longer used
  updateThumbnailTrigger: false,
  stroke: '#ccc',
};

export const boardSpecs = (state = defaultboardSpecs, action) => {
  switch (action.type) {

    case actions.UPDATE_ANCHOR_POSITIONS:
      return {
        ...state,
        checkCollisionTrigger: !state.checkCollisionTrigger,
      };
      break;
    case actions.TRIGGER_THUMBNAIL_UPDATE:
    case actions.UPDATE_MODULE_FILL:
      return {
        ...state,
        updateThumbnailTrigger: !state.updateThumbnailTrigger,
      };
      break;
    case actions.UPDATE_BOARD_DIMENSIONS:
      return {
        ...state,
        width: action.dimensions.width,
        height: action.dimensions.height,
        updateThumbnailTrigger: !state.updateThumbnailTrigger,
      };
      break;
    case actions.UPDATE_BOARD_POSITION:
      return {
        ...state,
        x: action.position.x,
        y: action.position.y,
        updateThumbnailTrigger: !state.updateThumbnailTrigger,
      };
      break;
    case actions.UPDATE_BOARD_STROKE:
      return {
        ...state,
        stroke: action.boardStroke,
        updateThumbnailTrigger: !state.updateThumbnailTrigger,
      };
      break;
    case actions.UPDATE_PROJECT_SUCCESS:
      return {
        ...state,
        savedThumbnail: state.tempThumbnail,
      };
    break;
    case actions.FECTCH_PROJECT_BY_ID_SUCCESS:
    case actions.POST_PROJECT_SUCCESS:
      const boardSpecs = action.project.boardSpecs;
      const { x, y, width, height, thumbnail } = boardSpecs;

      return {
        ...state,
        x,
        y,
        width,
        height,
      };
      break;
    default:
      return state;
  }

  if (doesModifyProject(action)) {
    console.log('triggering')
    return {
      ...state,
      updateThumbnailTrigger: !state.updateThumbnailTrigger,
    };
  }

  return state;
};

const defaultAnchorPositions = {
  updateAnchorTrigger: false,
  topLeft: { x: 0, y: 0 },
  topRight: { x: null, y: 0 },
  bottomLeft: { x: 0, y: null },
  bottomRight: { x: null, y: null },
};

export const anchorPositions = (state = defaultAnchorPositions, action) => {
  switch (action.type) {
    case actions.UPDATE_ANCHOR_POSITIONS:
      return {
        ...state,
        ...action.positions
      }
      break;
    case actions.TRIGGER_ANCHOR_UPDATE:
      return {
        ...state,
        updateAnchorTrigger: !state.updateAnchorTrigger,
      };
      break;
    case actions.FECTCH_PROJECT_BY_ID_SUCCESS:
      return defaultAnchorPositions;
      break;
    default:
      return state;
  }
};
