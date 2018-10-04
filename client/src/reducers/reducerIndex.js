import { combineReducers } from 'redux';

import undoable from 'helpers/undoable';
import skipIfImageNodeNull from 'helpers/skipIfImageNodeNull';

import { activeModules, modules, moduleBank, hoveredModule, clickedModuleIndex } from './moduleReducers';
import { projects } from './projectReducers';
import { boardSpecs, anchorPositions } from './boardReducers';
import { mouseEvents } from './mouseEventReducers';
import { nav } from './navReducers';
import { showSavingMessage } from './savedStateReducers';
import { showAllIcons, shouldRenderSideBar, moduleData } from './sideBarReducers';
import { triggers } from './triggersReducers';
import { tutorial } from './tutorialReducers';
import { modal } from './modalReducers';

export default combineReducers({
  activeModules: undoable(activeModules, skipIfImageNodeNull),
  anchorPositions,
  boardSpecs,
  showSavingMessage,
  hoveredModule,
  showAllIcons,
  clickedModuleIndex,
  modal,
  modules,
  moduleData,
  mouseEvents,
  nav,
  projects,
  shouldRenderSideBar,
  triggers,
  tutorial,
});
