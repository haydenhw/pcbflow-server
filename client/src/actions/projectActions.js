import { Route, hashHistory } from 'react-router';

import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';

import { projectsUrl } from '../config/endpointUrls';

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

export const createNewProject = () => (dispatch) => {
    const newProject = {
      name: 'Untitled',
      boardSpecs: {
        x: 250,
        y: 100,
        height: 300,
        width: 500,
        thumbnail: '{"attrs":{"width":520,"height":320},"className":"Stage","children":[{"attrs":{"name":"boardLayer"},"className":"Layer","children":[{"attrs":{"name":"boardGroup","x":10,"y":10,"width":500,"height":300,"draggable":"true"},"className":"Group","children":[{"attrs":{"name":"board","width":500,"height":300,"fill":"#e3e3e5","opacity":"0.5","stroke":"#ccc"},"className":"Rect"},{"attrs":{"stroke":"#666","fill":"#ddd","strokeWidth":"2","radius":"8","name":"topLeft","draggable":"true","dragOnTop":"false"},"className":"Circle"},{"attrs":{"x":500,"stroke":"#666","fill":"#ddd","strokeWidth":"2","radius":"8","name":"topRight","draggable":"true","dragOnTop":"false"},"className":"Circle"},{"attrs":{"y":300,"stroke":"#666","fill":"#ddd","strokeWidth":"2","radius":"8","name":"bottomLeft","draggable":"true","dragOnTop":"false"},"className":"Circle"},{"attrs":{"x":500,"y":300,"stroke":"#666","fill":"#ddd","strokeWidth":"2","radius":"8","name":"bottomRight","draggable":"true","dragOnTop":"false"},"className":"Circle"},{"attrs":{},"className":"Group","children":[]}]}]}]}',
      },
      modules: [],
    };

    dispatch(postNewProject(newProject));
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

export function fetchProjects() {
  return (dispatch) => {
    dispatch(fetchProjectsRequest());
    return fetch(projectsUrl)
    .then(res => res.json())
    .then((data) => {
      dispatch(fetchProjectsSuccess(data));
    })
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
      if (todoIds.indexOf(module.id) !== -1) {
        dispatch(actions.completeTodo(module.id));
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

export const POST_NEW_PROJECT_SUCCESS = 'POST_NEW_PROJECT_SUCCESS';
export const postNewProjectSuccess = modules => ({
  type: 'POST_NEW_PROJECT_SUCCESS',
  modules,
});

export function postNewProject(newProject) {
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
      .then((data) => {
        const projectId = data._id;
        console.log('New project saved');
        dispatch(fetchProjectById(projectId));
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

export const UPDATE_PROJECT_SUCCESS = 'UPDATE_PROJECT_SUCCESS';
export const updateProjectSuccess = project => ({
  type: 'UPDATE_PROJECT_SUCCESS',
  project,
});

export function updateProject(data, projectId) {
  return (dispatch) => {
    const projectUrl = `${projectsUrl}/${projectId}`;
    fetch(projectUrl, {
      method: 'put',
      body: JSON.stringify(data),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then((data) => {
        dispatch(updateProjectSuccess(data));
      })
      // .catch((err) => {
      //   throw new Error(err);
      // });
  };
}

export const DELETE_PROJECT_SUCCESS = 'DELETE_PROJECT_SUCCESS';
export const deleteProjectSuccess = (projectId, projects) => ({
  type: 'DELETE_PROJECT_SUCCESS',
  projectId,
});

export const DELETE_PROJECT_REQUEST = 'DELETE_PROJECT_REQUEST';
export function deleteProject(projectId, projects) {
  const url = `${projectsUrl}/${projectId}`;
  return (dispatch) => {
    dispatch({
      type: 'DELETE_PROJECT_REQUEST',
    });

    fetch(
      url,
      {
        method: 'DELETE',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      .then((res) => {
        console.log('delete successful');
        dispatch(fetchProjects());
      })
      .catch((err) => {
        console.error(err);
      });
  };
}
