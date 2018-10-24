import { createSelector } from 'reselect'
import { getEntitiesSession } from './entitySelectors';
import { getActiveProject } from './projectSelectors';

export const getHoveredModuleId = state => state.modules.hovered;

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

export const getHoveredModule = createSelector(
  [getEntitiesSession, getHoveredModuleId],
  (session, id) => (
    session && Number.isInteger(id)
      ? session.Module.withId(id).ref
      : null
  )
);
