import { createSelector } from 'reselect'
import { getEntitiesSession } from './entitySelectors';

export const hello = 'hello';

export const getActiveProjectId = state => state.projects.activeProjectId;

const getProjectWithModules = (session, activeId) => {
  const activeProject = session.Project.get({ _id: activeId }).ref;
  const activeProjectId =  activeProject.id;
  const modules = session.Module.filter({ project: activeProjectId }).toRefArray();

  return Object.assign({}, activeProject, { activeModules: modules });
}

export const getProjects = createSelector(
  getEntitiesSession,
  session => session.Project.all().toRefArray()
);

export const getActiveProject = createSelector(
  [getEntitiesSession, getActiveProjectId],
  (session, activeId, modules) => (
    !activeId
      ? null
      : session.Project.count() === 0
      ? null
      : getProjectWithModules(session, activeId)
  )
);

export const getActiveProjectBoard = createSelector(
  getActiveProject,
  project => (
    project && project.board
      ? project.board
      : { width: undefined, height: undefined, }
  )
);

const getActiveProjectPropVal = key => createSelector(
  getActiveProject,
  project => project ? project[key] : null
);

export const getActiveProjectName = getActiveProjectPropVal('name');
