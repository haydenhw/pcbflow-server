import { createSelector } from 'reselect'
import { getEntitiesSession } from './entitySelectors';

export const getActiveProjectId = state => state.projects.activeProjectId;

export const getProjects = createSelector(
  getEntitiesSession,
  session => session.Project.all().toRefArray()
);

export const getActiveProject = createSelector(
  [getEntitiesSession, getActiveProjectId],
  (session, activeId) => (
    !activeId
      ? null
      : session.Project.count() === 0
      ? null
      : session.Project.get({ _id: activeId }).ref
  )
);

const getActiveProjectPropVal = key => createSelector(
  getActiveProject,
  project => project ? project[key] : null
);

export const getActiveProjectName = getActiveProjectPropVal('name');
export const getActiveProjectBoard = getActiveProjectPropVal('board');
