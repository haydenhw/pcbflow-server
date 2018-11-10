import { createSelector } from 'reselect'
import { getEntitiesSession } from './entitySelectors';
import {  getActiveProject } from './projectSelectors';

export const getHoveredModuleId = state => state.modules.hoveredId;
export const getDraggingModuleId = state => state.modules.dragging;

export const getModules = createSelector(
  getEntitiesSession,
  session => session.Module.all().toRefArray()
);

export const getModulesByProject = (projectId) => createSelector(
  getEntitiesSession,
  session => session.Module.filter({ project: projectId }).toRefArray(),
);

export const getActiveModules = createSelector(
  [getEntitiesSession, getActiveProject],
  (session, project) => (
    session && project
      ? session.Module.filter({ project: project.id }).toRefArray()
      : []
  )
);

export const getModuleById = (idGetter) => createSelector(
  [getEntitiesSession, idGetter],
  (session, id) => (
    session && Number.isInteger(id)
      ? session.Module.withId(id).ref
      : null
  )
);

export const getHoveredModule = getModuleById(getHoveredModuleId);
export const getDraggingModule = getModuleById(getDraggingModuleId);
