import { combineReducers } from 'redux';

import undoable from 'helpers/undoable';
import skipIfImageNodeNull from 'helpers/skipIfImageNodeNull';

import { activeModules, moduleBank, draggingModule, hoveredModule, clickedModuleIndex } from './moduleReducers';
import { projects } from './projectReducers';
import { boardSpecs, anchorPositions } from './boardReducers';
import { mouseEvents } from './mouseEventReducers';
import { hasUnsavedChanges } from './savedStateReducers';
import { showAllIcons, shouldRenderSideBar, moduleData } from './sideBarReducers';
import { triggers } from './triggersReducers';
import { tutorial } from './tutorialReducers';
import { modal } from './modalReducers';

export default combineReducers({
  activeModules: undoable(activeModules, skipIfImageNodeNull),
  anchorPositions,
  boardSpecs,
  draggingModule,
  hasUnsavedChanges,
  hoveredModule,
  showAllIcons,
  clickedModuleIndex,
  modal,
  moduleData,
  mouseEvents,
  projects,
  shouldRenderSideBar,
  triggers,
  tutorial,
});
