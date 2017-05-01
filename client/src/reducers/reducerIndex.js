import { combineReducers } from 'redux';
import undoable from 'helpers/undoable';
import skipIfImageNodeNull  from 'helpers/skipIfImageNodeNull';

import { currentProjectModules, moduleBank, draggingModule, selectedModule } from './moduleReducers';
import { projectList, currentProjectInfo } from './projectReducers';
import { boardSpecs, anchorPositions } from './boardReducers';
import { mouseEvents } from './mouseEventReducers';
import { hasUnsavedChanges } from './savedStateReducers';
import { todos } from './todos';


export default combineReducers({
  projectList,
  currentProjectInfo,
  currentProjectModules: undoable(currentProjectModules, skipIfImageNodeNull),
  moduleBank,
  draggingModule,
  selectedModule,
  boardSpecs,
  anchorPositions,
  mouseEvents,
  hasUnsavedChanges
});
