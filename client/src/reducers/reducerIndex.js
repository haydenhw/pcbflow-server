import { combineReducers } from 'redux';
import undoable from 'redux-undo';

import { currentProjectModules, moduleBank, draggingModule, selectedModule } from './moduleReducers';
import { projectList, currentProjectInfo } from './projectReducers';
import { boardSpecs, anchorPositions } from './boardReducers';
import { mouseEvents } from './mouseEventReducers';
import { hasUnsavedChanges } from './savedStateReducers';
import todos from './todos';

export default combineReducers({
  projectList,
  currentProjectInfo,
  currentProjectModules,
  moduleBank,
  draggingModule,
  selectedModule,
  boardSpecs,
  anchorPositions,
  mouseEvents,
  hasUnsavedChanges,
  todos
});
