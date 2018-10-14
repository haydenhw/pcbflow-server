import { createSelector } from 'reselect'
import { getEntitiesSession } from './entitySelectors';
import { getActiveProjectId } from './projectSelectors';

export const getModules = createSelector(
  getEntitiesSession,
  session => session.Module.all().toRefArray()
);

export const getActiveModules = createSelector(
  [getEntitiesSession, getActiveProjectId],
  (session, projectId) => session.Module.filter({ project: projectId }).toRefArray()
);
