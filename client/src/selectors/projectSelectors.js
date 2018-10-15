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
    activeId
      ? session.Project.get({ _id: activeId }).ref
      : null
  )
);

const getActiveProjectPropVal = key => createSelector(
  getActiveProject,
  project => project ? project[key] : null
);

export const getActiveProjectName = getActiveProjectPropVal('name');
export const getActiveProjectThumbnail = getActiveProjectPropVal('thumbnail');
export const getActiveProjectBoard = getActiveProjectPropVal('boardSpecs');
