import { combineReducers } from 'redux';

import undoable from 'helpers/undoable';
import skipIfImageNodeNull from 'helpers/skipIfImageNodeNull';

import { modules } from './modulesReducers';
import { entities } from './entitiesReducers';
import { projects } from './projectReducers';
import { board, anchors } from './boardReducers';
import { mouseEvents } from './mouseEventReducers';
import { nav } from './navReducers';
import { sideBar } from './sideBarReducers';
import { triggers } from './triggersReducers';
import { tutorial } from './tutorialReducers';
import { modal } from './modalReducers';

export default combineReducers({
  // activeModules: undoable(activeModules, skipIfImageNodeNull),
  anchors,
  board,
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
