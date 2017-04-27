import { combineReducers } from 'redux';
import { currentProjectModules, moduleBank, draggingModule, selectedModule } from './moduleReducers';
import { projectList, currentProjectInfo } from './projectReducers';
import { boardSpecs, anchorPositions } from './boardReducers';
import { mouseEvents } from './mouseEventReducers';
import { hasUnsavedChanges } from './savedStateReducers';

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
});
