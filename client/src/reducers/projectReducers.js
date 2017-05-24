import * as actions from '../actions/indexActions';

const defaultProjectState = {
  isFetching: false,
  items: []
}

export const projects = (state = defaultProjectState, action) => {
  switch (action.type) {
    case actions.FETCH_PROJECTS_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case actions.FETCH_PROJECTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        items: action.projects 
      }
    case actions.FETCH_PROJECTS_FAILURE:
      return {
        ...state,
        isFetching: false,
      }
    default:
      return state;
  }
}

const defaultProjectInfo = {
  price: '$15.00',
};

export const currentProjectInfo = (state = defaultProjectInfo, action) => {
  switch (action.type) {
    case actions.FECTCH_PROJECT_BY_ID_SUCCESS:
      return {
        ...state,
        name: action.project.name,
        id: action.project._id,
      };
      break;
    case actions.UPDATE_PROJECT_SUCCESS:
      return {
        ...state,
        name: action.project.name,
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

/*
export const projects = (state = [], action) => {
  switch(action.type){
    case(actions.FETCH_PROJECTS_SUCCESS):
      return action.projects;
      break;
    case(actions.DELETE_PROJECT_SUCCESS):
  }
}*/
