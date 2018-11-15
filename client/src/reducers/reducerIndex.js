import { undoable } from 'helpers/undoable';

import { combineReducers } from 'redux';

import { anchors } from './anchorReducers';
import { modules } from './modulesReducers';
import { entities } from './entitiesReducers';
import { projects } from './projectReducers';
import { board } from './boardReducers';
import { mouseEvents } from './mouseEventReducers';
import { nav } from './navReducers';
import { sideBar } from './sideBarReducers';
import { skipIfImageNodeNull } from './sideBarReducers';
import { triggers } from './triggersReducers';
import { tutorial } from './tutorialReducers';
import { modal } from './modalReducers';

export default combineReducers({
  // add back skipIfImageNodeNull
  // entities: undoable(entities, skipIfImageNodeNull),

  entities: undoable(entities),
  // entities,
  anchors,
  modal,
  modules,
  mouseEvents,
  nav,
  projects,
  sideBar,
  triggers,
  tutorial,
});
