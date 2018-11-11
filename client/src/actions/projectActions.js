// *alphabetize these actions
import { hashHistory } from 'react-router';

import * as actions from 'actions/indexActions';

import { projectsUrl } from '../config/endpointUrls';
import { getJWTAuthHeader, getUser } from 'helpers/users';
import { addAnchorsToProject } from 'helpers/anchorHelpers';
import { getOriginAdjustedProjectData } from 'helpers/projectHelpers';
import { getModulesByProject } from '../selectors/moduleSelectors';
import { getActiveProject } from '../selectors/projectSelectors';

export const createNewProject = () => (dispatch) => {
  const ownerId = getUser()._id;
  const height = 300;
  const width = 500;
  const offsetX = 200;

  if (!ownerId) {
    console.warn('OwnerId is undefined');
  }
  // *move to constants folder
  const newProject = {
    ownerId,
    name: 'Untitled',
    board: {
      height,
      width,
      x: (0.5 * (document.documentElement.clientWidth + offsetX)) - (width / 2),
      y: (0.5 * document.documentElement.clientHeight) - (height / 2),
    },
    modules: [],
  };

  dispatch(postProject(newProject));
};

export const FETCH_PROJECTS_REQUEST = 'FETCH_PROJECTS_REQUEST';
export const fetchProjectsRequest = () => ({
  type: 'FETCH_PROJECTS_REQUEST',
});

export const FETCH_PROJECTS_SUCCESS = 'FETCH_PROJECTS_SUCCESS';
export const fetchProjectsSuccess = projects => ({
  type: 'FETCH_PROJECTS_SUCCESS',
  projects,
});

export function fetchProjects(jwt) {
  if (!jwt) {
    console.warn('JWT not provided or undefined');
  }

  return (dispatch) => {
    dispatch(fetchProjectsRequest());

    return fetch(projectsUrl, {
      method: 'GET',
      headers: {
        ...getJWTAuthHeader(jwt),
      },
    })
    .then(res => res.json())
    .then((projects) => {
      dispatch(fetchProjectsSuccess(projects));
    });
    // .catch((err) => {
    //   console.error(err);
    // });
  };
}

export const FECTCH_PROJECT_BY_ID_SUCCESS = 'FECTCH_PROJECT_BY_ID_SUCCESS';
export const fetchProjectByIdSuccess = project => (dispatch, getState) => {
  const { isTutorialActive } = getState().tutorial;

  if (isTutorialActive) {
    const todoIds = ['101', '106', '107', '108', '112'];

    project.modules.forEach((module) => {
      if (todoIds.indexOf(module.dependencyId) !== -1) {
        dispatch(actions.completeTodo(module.dependencyId));
      }
    });
  }

  dispatch({
    type: 'FECTCH_PROJECT_BY_ID_SUCCESS',
    project,
  });
};

export function fetchProjectById(projectId, currentRoute) {
  const projectUrl = `${projectsUrl}/${projectId}`;

  return (dispatch) => {
    fetch(projectUrl)
    .then(res => res.json())
    .then((data) => {
      dispatch(fetchProjectByIdSuccess(data));
      const designRoute = `/design/${projectId}`;

      if (currentRoute !== designRoute) {
        hashHistory.push(designRoute);
      }
    })
    // .catch((err) => {
    //   console.error(err);
    // });
  };
}

export function postProject(newProject) {
  return (dispatch) => {
    fetch(
      projectsUrl,
      {
        method: 'POST',
        body: JSON.stringify(newProject),
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      .then(res => res.json())
      .then((project) => {
        const projectWithAnchors = addAnchorsToProject(project);
        dispatch(actions.createEntity('Project', projectWithAnchors))

        const designRoute = `/design/${project._id}`;
        hashHistory.push(designRoute);
      })
      .catch((err) => {
        // console.error(err);
      });
  };
}

export const SET_ACTIVE_PROJECT_ID = 'SET_ACTIVE_PROJECT_ID';
export const setActiveProjectId = (activeProjectDbId) => (dispatch) => {

  dispatch({
    type: 'SET_ACTIVE_PROJECT_ID',
    id: activeProjectDbId,
  });
}

export const UPDATE_PROJECT_REQUEST = 'UPDATE_PROJECT_REQUEST';
export const updateProjectRequest = project => ({
  type: 'UPDATE_PROJECT_REQUEST',
  project,
});

export const UPDATE_PROJECT_SUCCESS = 'UPDATE_PROJECT_SUCCESS';
export const updateProjectSuccess = project => ({
  type: 'UPDATE_PROJECT_SUCCESS',
  project,
});

export function updateProject() {
  return (dispatch, getState) => {
    const state = getState();
    const activeProject = getActiveProject(state);;
    const anchors = state.anchors;
    const projectUrl = `${projectsUrl}/${activeProject._id}`;
    const originAdjustedProjectData = getOriginAdjustedProjectData(activeProject, anchors);

    dispatch(updateProjectRequest());

    fetch(projectUrl, {
      method: 'PUT',
      body: JSON.stringify(originAdjustedProjectData),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then((data) => {
        setTimeout(() => dispatch(updateProjectSuccess()), 500);
      })
      // .catch((err) => {
      //   throw new Error(err);
      // });
  };
}

export const DELETE_PROJECT_REQUEST = 'DELETE_PROJECT_REQUEST';
export function deleteProject(project) {
  const { _id: dbID, id } = project;
  const url = `${projectsUrl}/${dbID}`;

  return (dispatch, getState) => {
    const state = getState();
    const projectModules = getModulesByProject(id)(state);

    projectModules.forEach(module => (
      dispatch(actions.deleteEntity('Module', module.id))
    ));

    dispatch(actions.deleteEntity('Project', id));

    fetch(url, {
        method: 'DELETE',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      .catch((err) => {
        console.error(err);
      });
  };
}
