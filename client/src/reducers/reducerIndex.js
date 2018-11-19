import { undoable } from 'helpers/undoable';

import { combineReducer } from 'redux';

import { anchors } from './anchorReducer';
import { modules } from './modulesReducer';
import { entities } from './entityReducer';
import { projects } from './projectReducer';
import { board } from './boardReducer';
import { mouseEvents } from './mouseEventReducer';
import { nav } from './navReducer';
import { sideBar } from './sideBarReducer';
import { skipIfImageNodeNull } from './sideBarReducer';
import { triggers } from './triggersReducer';
import { tutorial } from './tutorialReducer';
import { modal } from './modalReducer';

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
