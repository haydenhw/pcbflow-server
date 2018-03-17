import * as actions from '../actions/indexActions';
import doesModifyProject from 'helpers/doesModifyProject';

const defaultProjectState = {
  isFetching: false,
  isInitialLoad: true,
  isSaving: null,
  items: [],
  saveProjectTrigger: false,
};

export const projects = (state = defaultProjectState, action) => {
  switch (action.type) {
    case actions.DELETE_PROJECT_REQUEST:
      return {
        ...state,
        items: state.items.filter(project => project._id !== action.projectId),
      };
    case actions.FETCH_PROJECTS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case actions.FETCH_PROJECTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        items: action.projects,
      };
    case actions.FETCH_PROJECTS_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    case actions.POST_PROJECT_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.project],
      };
    case actions.UPDATE_BOARD_THUMBNAIL:
      const updatedProjects = state.items.map(project => {
        if (project._id === action.projectId) {
          const updatedBoardSpecs = Object.assign({}, { ...project.boardSpecs }, { thumbnail: action.thumbnail })
          const updatedProject = Object.assign({}, project, { boardSpecs: updatedBoardSpecs });
          return updatedProject;
        }

        return project;
      });

      return {
        ...state,
        items: updatedProjects,
      }
    case actions.UPDATE_PROJECT_REQUEST:
      return {
        ...state,
        isSaving: true,
      };
    case actions.UPDATE_PROJECT_SUCCESS:
      return {
        ...state,
        isSaving: false,
        isInitialLoad: false,
      };
  }

  if (action.type !== actions.UPDATE_MODULE_FILL && doesModifyProject(action)) {
    return {
      ...state,
      saveProjectTrigger: !state.saveProjectTrigger,
    };
  }

  return state;
};

const defaultProjectInfo = {
  price: '$15.00',
};

export const currentProjectInfo = (state = defaultProjectInfo, action) => {
  switch (action.type) {
    case actions.POST_PROJECT_SUCCESS:
    case actions.FECTCH_PROJECT_BY_ID_SUCCESS:
      return {
        ...state,
        name: action.project.name,
        id: action.project._id,
      };
      break;
    case actions.UPDATE_PROJECT_NAME:
      return {
        ...state,
        name: action.newName,
      };
      break;
    case actions.UPDATE_PROJECT_PRICE:
      return {
        ...state,
        price: action.price,
      };
      break;
    case actions.UPDATE_LAST_SAVED_TIME:
      return {
        ...state,
        timeLastSaved: action.time,
      };
      break;
    default:
      return state;
  }
};
