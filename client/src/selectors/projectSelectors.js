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
    Number.isInteger(activeId)
      ? session.Project.withId(activeId).ref
      : null
  )
);

export const getActiveProjectName = createSelector(
  getActiveProject,
  project => project ? project.name : null
);

export const getActiveProjectThumbnail = createSelector(
  getActiveProject,
  project => project ? project.thumbnail: null
);
