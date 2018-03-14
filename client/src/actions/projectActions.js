// alphabetize these actions

import { hashHistory } from 'react-router';
import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';

import { projectsUrl } from '../config/endpointUrls';
import { getJWTAuthHeader, getUser, getJWT } from 'helpers/users';

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

export const createNewProject = () => (dispatch) => {
  const ownerId = getUser()._id;
  const height = 300;
  const width = 500;
  const offsetX = 200;

  if (!ownerId) {
    console.warn('OwnerId is undefined');
  }

  const newProject = {
    ownerId,
    name: 'Untitled',
    boardSpecs: {
      height,
      width,
      x: (0.5 * (document.documentElement.clientWidth + offsetX)) - (width / 2),
      y: (0.5 * document.documentElement.clientHeight) - (height / 2),
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
    .then((data) => {
      dispatch(fetchProjectsSuccess(data));
    });
    // .catch((err) => {
    //   console.error(err);
    // });
  };
}
// export function fetchProjects() {
//   return (dispatch) => {
//     dispatch(fetchProjectsRequest());
//     return fetch(projectsUrl)
//     .then(res => res.json())
//     .then((data) => {
//       dispatch(fetchProjectsSuccess(data));
//     })
//     // .catch((err) => {
//     //   console.error(err);
//     // });
//   };
// }

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

export const POST_PROJECT_SUCCESS = 'POST_PROJECT_SUCCESS';
export const postProjectSuccess = project => dispatch => {
  dispatch({
    type: 'POST_PROJECT_SUCCESS',
    project
  });

  const designRoute = `/design/${project._id}`;
  hashHistory.push(designRoute);
};

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
        dispatch(postProjectSuccess(data))
      })
      .catch((err) => {
        console.error(err);
      });
  };
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

export function updateProject(projectData) {
  return (dispatch) => {
    console.log('saving project')
    const { currentProjectId: projectId } = projectData;
    const projectUrl = `${projectsUrl}/${projectId}`;
    const originAdjustedProjectData = getOriginAdjustedProjectData(projectData);
    // console.log(originAdjustedProjectData);

    dispatch(updateProjectRequest());
    fetch(projectUrl, {
      method: 'put',
      body: JSON.stringify(originAdjustedProjectData),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then((data) => {
        // console.log(data);
        setTimeout(() => dispatch(updateProjectSuccess()), 500);
      })
      // .catch((err) => {
      //   throw new Error(err);
      // });
  };
}

export const UPDATE_PROJECT_NAME = 'UPDATE_PROJECT_NAME';
export const updateProjectName = (newName) => ({
  type: 'UPDATE_PROJECT_NAME',
  newName,
});

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
      projectId,
    });

    fetch(url, {
        method: 'DELETE',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      .then((res) => {
        console.log('project deleted successfully');
      })
      .catch((err) => {
        console.error(err);
      });
  };
}
