import { createSelector } from 'reselect'
import { getEntitiesSession } from './entitySelectors';
import { getActiveProject } from './projectSelectors';

export const getModules = createSelector(
  getEntitiesSession,
  session => session.Module.all().toRefArray()
);

export const getActiveModules = createSelector(
  [getEntitiesSession, getActiveProject],
  (session, project ) => session.Module.filter({ project: project.id }).toRefArray()
);
