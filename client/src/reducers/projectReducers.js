import * as actions from '../actions/indexActions';
import * as types from '../constants/actionTypes';
import doesModifyProject from 'helpers/doesModifyProject';

const defaultProjectState = {
  activeProjectId: null,
  isFetching: false,
  isInitialLoad: true,
  showSavingMessage: null,
  items: [],
};

export const projects = (state = defaultProjectState, action) => {
  switch (action.type) {
    case actions.SET_ACTIVE_PROJECT_ID:
      return {
        ...state,
        activeProjectId: action.id,
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
      };
    case types.ENTITY_CREATE:
      const { itemType, newItemAttributes } = action.payload;

      if (itemType === 'Project') {
        const { _id } = newItemAttributes;
        return {
          ...state,
          activeProjectId: _id,
        };
      }

      return state;
    // get thumbnails to render from  from entities

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
    // replace with update entity
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
    // replace with update entity succ
    case actions.UPDATE_PROJECT_SUCCESS:
      return {
        ...state,
        isInitialLoad: false,
      };
  }

  return state;
};
