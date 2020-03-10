// *alphabetize these actions
import { hashHistory } from 'react-router';

import * as actions from 'actions/indexActions';

import { projectsUrl } from '../config/endpointUrls';
import { sampleProject } from '../config/sampleProject'
import { getJWTAuthHeader, getUser, getJWT } from 'helpers/users';
import { getSampleProjectWithId } from 'helpers/projectHelpers';

import {
  hasSampleProject,
  getProjectById,
  getIdFromUrl,
  isDesignRoute
} from 'helpers/projectHelpers';

const getOriginAdjustedModules = (modules, originX, originY) => (
  modules.map((module) => {
    const x = module.x - originX;
    const y = module.y - originY;

    return Object.assign({}, module, { x, y });
  })
);

const getOriginAdjustedProjectData = ({
  boardSpecs,
  currentProjectModules: modules,
  currentProjectName: projectName,
  currentProjectThumbnail: thumbnail,
  topLeftAnchorX: originX,
  topLeftAnchorY: originY,
}) => {
  const { width, height, x, y } = boardSpecs;

  return {
    name: projectName,
    boardSpecs: {
      width,
      height,
      thumbnail,
      x: x + originX,
      y: y + originY,
    },
    modules: getOriginAdjustedModules(modules, originX, originY),
  };
};

export const UPDATE_PROJECT_PRICE = 'UPDATE_PROJECT_PRICE';
export const updateProjectPrice = price => ({
  type: 'UPDATE_PROJECT_PRICE',
  price,
});

export const UPDATE_LAST_SAVED_TIME = 'UPDATE_LAST_SAVED_TIME';
export const updateLastSavedTime = time => ({
  type: 'UPDATE_LAST_SAVED_TIME',
  time,
});

export const createNewProject = (name='Untitled', extraProps) => (dispatch) => {
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
    name,
    boardSpecs: {
      height,
      width,
      x: (0.5 * (document.documentElement.clientWidth + offsetX)) - (width / 2),
      y: (0.5 * document.documentElement.clientHeight) - (height / 2),
    },
    modules: [],
    ...extraProps
  };

  return dispatch(postNewProject(newProject, true));
};

export const FETCH_PROJECTS_REQUEST = 'FETCH_PROJECTS_REQUEST';
export const fetchProjectsRequest = () => ({
  type: 'FETCH_PROJECTS_REQUEST',
});


export const FETCH_PROJECTS_SUCCESS = 'FETCH_PROJECTS_SUCCESS';
export const fetchProjectsSuccess = (projects) => (dispatch, getState) => {
  const currentUrl = window.location.href;
  const isOnDesignPage = isDesignRoute(currentUrl);

  if (isOnDesignPage) {
    const projectId = getIdFromUrl(currentUrl);
    dispatch(setActiveProject(projects, projectId));
  }

  dispatch({
    type: 'FETCH_PROJECTS_SUCCESS',
    projects,
  });

  return projects;
};

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
      const containsSampleProject = hasSampleProject(projects);

      if (!containsSampleProject) {
        const userId = getUser()._id;
        const sampleProjectWithId = getSampleProjectWithId(sampleProject, userId);

        return dispatch(postNewProject(sampleProjectWithId))
          .then((sampleProject) => {
            dispatch(fetchProjectsSuccess([sampleProject, ...projects]))
          })
      } else {
        return dispatch(fetchProjectsSuccess([...projects].reverse()))
      }
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

export const fetchProjectById = (projectId, currentRoute) => (dispatch, getState) => {
  const state = getState();
  const { projects } = state;
  const project = getProjectById(projects.items, projectId);
  const projectUrl = `${projectsUrl}/${projectId}`;
  const designRoute = `/design/${projectId}`;

  dispatch(fetchProjectByIdSuccess(project));

  if (currentRoute !== designRoute) {
      hashHistory.push(designRoute);
  }
}

export const POST_PROJECT_SUCCESS = 'POST_PROJECT_SUCCESS';
export const postProjectSuccess = (project, shouldRoute) => dispatch => {
  dispatch({
    type: 'POST_PROJECT_SUCCESS',
    project
  });

  if (shouldRoute) {
    const designRoute = `/design/${project._id}`;
    hashHistory.push(designRoute);
  }
};

export function postNewProject(newProject, shouldRoute) {
  return (dispatch) => {
    return fetch(
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
        const projectId = project._id;
        dispatch(postProjectSuccess(project, shouldRoute))
        return project;
      })
      .catch((err) => {
        // console.error(err);
      });
  };
}

export const SET_ACTIVE_PROJECT = 'SET_ACTIVE_PROJECT';
export const setActiveProject =(projects, activeId, shouldRoute) => (dispatch, getState) => {
  const activeProject = getProjectById(projects, activeId);

  if (activeProject) {
    dispatch({
      type: 'SET_ACTIVE_PROJECT',
      project: activeProject,
    })

    if (shouldRoute) {
      const newRoute = `/design/${activeId}`;
      hashHistory.push(newRoute)
    }
  } else {
    hashHistory.push('projects');
  }
};

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

export const UPDATE_PROJECT_NAME = 'UPDATE_PROJECT_NAME';
export const updateProjectName = (name, projectId) => ({
  type: 'UPDATE_PROJECT_NAME',
  name,
  projectId,
});

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
