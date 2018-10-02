import { combineReducers } from 'redux';

import undoable from 'helpers/undoable';
import skipIfImageNodeNull from 'helpers/skipIfImageNodeNull';

import { activeProjectModules, moduleBank, draggingModule, hoveredModule, lastClickedModuleIndex } from './moduleReducers';
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
  hoveredModule,
  iconVisibity,
  lastClickedModuleIndex,
  modal,
  moduleData,
  mouseEvents,
  projects,
  shouldRenderSideBar,
  triggers,
  tutorial,
});
