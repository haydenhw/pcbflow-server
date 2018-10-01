import * as actions from '../actions/indexActions';
import doesModifyProject from 'helpers/doesModifyProject';

const defaultProjectState = {
  activeProjectId: null,
  isFetching: false,
  isInitialLoad: true,
  isSaving: null,
  items: [],
};

export const projects = (state = defaultProjectState, action) => {
  switch (action.type) {
    case actions.DELETE_PROJECT_REQUEST:
      return {
        ...state,
        items: state.items.filter(project => project._id !== action.projectId),
      };
    case actions.FECTCH_PROJECT_BY_ID_SUCCESS:
      return {
        ...state,
        activeProjectId: action.project._id,
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
    case actions.UPDATE_BOARD_THUMBNAIL: {
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
    }
    case actions.UPDATE_PROJECT_NAME: {
      const updatedProjects = state.items.map(project => {
        if (project._id === action.projectId) {
          const updatedProject = Object.assign({}, project, { name: action.newName });
          return updatedProject;
        }

        return project;
      });

      return {
        ...state,
        items: updatedProjects,
      }
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

  return state;
};
