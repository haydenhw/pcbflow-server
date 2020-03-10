import { getActiveProject } from '../selectors/projectSelectors';
import * as actions from '../actions/indexActions';

export const UPDATE_BOARD = 'UPDATE_BOARD';
export const updateBoard = (newAttrs) => (dispatch, getState) => {
  const state = getState();
  const activeProject = getActiveProject(state);
  const { board: prevBoard, id } = activeProject;
  const newBoard = Object.assign({}, prevBoard, newAttrs);

export const TRIGGER_BOARD_UPDATE = 'TRIGGER_BOARD_UPDATE';
export const triggerBoardUpdate = () => ({
  type: 'TRIGGER_BOARD_UPDATE',
});

export const UPDATE_ANCHOR_POSITIONS = 'UPDATE_ANCHOR_POSITIONS';
export const updateAnchorPositions = positions => ({
  type: 'UPDATE_ANCHOR_POSITIONS',
  positions,
});

export const UPDATE_BOARD_POSITION = 'UPDATE_BOARD_POSITION';
export const updateBoardPosition = position => ({
  type: 'UPDATE_BOARD_POSITION',
  position,
});

export const UPDATE_BOARD_DIMENSIONS = 'UPDATE_BOARD_DIMENSIONS';
export const updateBoardDimensions = dimensions => ({
  type: 'UPDATE_BOARD_DIMENSIONS',
  dimensions,
});

export const UPDATE_BOARD_STROKE = 'UPDATE_BOARD_STROKE';
export const updateBoardStroke = boardStroke => ({
  type: 'UPDATE_BOARD_STROKE',
  boardStroke,
});
