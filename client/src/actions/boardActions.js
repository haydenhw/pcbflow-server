import { getActiveProject } from '../selectors/projectSelectors';
import * as actions from '../actions/indexActions';

export const UPDATE_BOARD = 'UPDATE_BOARD';
export const updateBoard = (newAttrs) => (dispatch, getState) => {
  const state = getState();
  const activeProject = getActiveProject(state);
  const { board: prevBoard, id } = activeProject;
  const newBoard = Object.assign({}, prevBoard, newAttrs);

  dispatch(actions.updateEntity('Project', id, { board: newBoard } ));
}

export const UPDATE_BOARD_STROKE = 'UPDATE_BOARD_STROKE';
export const updateBoardStroke = boardStroke => ({
  type: 'UPDATE_BOARD_STROKE',
  boardStroke,
});
