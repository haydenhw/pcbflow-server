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
    //* replace with delete entity
    // case actions.DELETE_PROJECT_REQUEST:
    //   return {
    //     ...state,
    //     items: state.items.filter(project => project._id !== action.projectId),
    //   };
    // do I need to fetch projects by id ? Dont I have to load all projects anyway?
    // fetch project ID does stuff with the tutorial. Make sure to move that logic somewhere
    // else after refactoring
    case actions.SET_ACTIVE_PROJECT_ID:
      return {
        ...state,
        activeProjectId: action.id,
      };
      //* leave alone
    case actions.FETCH_PROJECTS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
      // items part gets replaced with load projects
      // merge entity and entities
    case actions.FETCH_PROJECTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        // items: action.projects,
      };
    // this is replaced by create entity success. figure out how to
    //  set active  project id
    //  >> if itemType === project then set activeId
    case types.ENTITY_CREATE:
      const { itemType, newItemAttributes } = action.payload;
      const { id } = newItemAttributes;

      if (itemType === 'Project') {
        return {
          ...state,
          activeProjectId: id,
        };
      }

      return state;
    // replace with update entity
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
