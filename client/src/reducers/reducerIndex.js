import { combineReducers } from 'redux';

import undoable from 'helpers/undoable';
import skipIfImageNodeNull from 'helpers/skipIfImageNodeNull';

import { activeProjectModules, moduleBank, draggingModule, selectedModule } from './moduleReducers';
import { projects } from './projectReducers';
import { boardSpecs, anchorPositions } from './boardReducers';
import { mouseEvents } from './mouseEventReducers';
import { hasUnsavedChanges } from './savedStateReducers';
import { iconVisibity, shouldRenderSideBar, moduleData } from './sideBarReducers';
import { triggers } from './triggersReducers';
import { tutorial } from './tutorialReducers';
import { modal } from './modalReducers';

export default combineReducers({
  activeProjectModules: undoable(activeProjectModules, skipIfImageNodeNull),
  anchorPositions,
  boardSpecs,
  draggingModule,
  hasUnsavedChanges,
  iconVisibity,
  modal,
  moduleData,
  mouseEvents,
  projects,
  selectedModule,
  shouldRenderSideBar,
  triggers,
  tutorial,
});
