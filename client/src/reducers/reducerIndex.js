import { combineReducers } from 'redux';

import undoable from 'helpers/undoable';
import skipIfImageNodeNull from 'helpers/skipIfImageNodeNull';

import { currentProjectModules, moduleBank, draggingModule, selectedModule } from './moduleReducers';
import { projectList, currentProjectInfo } from './projectReducers';
import { boardSpecs, anchorPositions } from './boardReducers';
import { mouseEvents } from './mouseEventReducers';
import { hasUnsavedChanges } from './savedStateReducers';
import { iconVisibity, shouldRenderSideBar } from './sideBarReducers';
import { tutorial } from './tutorialReducers';

export default combineReducers({
  currentProjectModules: undoable(currentProjectModules, skipIfImageNodeNull),
  projectList,
  currentProjectInfo,
  moduleBank,
  draggingModule,
  selectedModule,
  boardSpecs,
  anchorPositions,
  iconVisibity,
  shouldRenderSideBar,
  mouseEvents,
  hasUnsavedChanges,
  tutorial
});
