import { combineReducers } from 'redux';
import undoable from 'redux-undo';

import { currentProjectModules, moduleBank, draggingModule, selectedModule } from './moduleReducers';
import { projectList, currentProjectInfo } from './projectReducers';
import { boardSpecs, anchorPositions } from './boardReducers';
import { mouseEvents } from './mouseEventReducers';
import { hasUnsavedChanges } from './savedStateReducers';

export default combineReducers({
  projectList,
  currentProjectInfo,
  currentProjectModules: undoable(currentProjectModules),
  moduleBank,
  draggingModule,
  selectedModule,
  boardSpecs: undoable(boardSpecs),
  anchorPositions,
  mouseEvents,
  hasUnsavedChanges,
});
