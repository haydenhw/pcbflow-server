import * as actions from '../actions/indexActions';
import * as types from '../constants/actionTypes';

const defaultProjectState = {
  activeProjectId: null,
  isFetching: false,
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
    default: return state;
  }
};
