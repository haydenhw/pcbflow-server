import { combineReducers } from 'redux';

import undoable from 'helpers/undoable';
import skipIfImageNodeNull from 'helpers/skipIfImageNodeNull';

import { activeModules, modules } from './moduleReducers';
import { entities } from './ormReducers';
import { projects } from './projectReducers';
import { boardSpecs, anchorPositions } from './boardReducers';
import { mouseEvents } from './mouseEventReducers';
import { nav } from './navReducers';
import { sideBar } from './sideBarReducers';
import { triggers } from './triggersReducers';
import { tutorial } from './tutorialReducers';
import { modal } from './modalReducers';

export default combineReducers({
  activeModules: undoable(activeModules, skipIfImageNodeNull),
  anchorPositions,
  boardSpecs,
  entities,
  modal,
  modules,
  mouseEvents,
  nav,
  projects,
  sideBar,
  triggers,
  tutorial,
});
