import * as actions from '../actions/indexActions';

export const projectList = (state = [], action) => {
  if (action.type === actions.FETCH_PROJECTS_SUCCESS) {
      return action.projects;
  }
  return state;
}

defaultProjectInfo = {
  price: "$15.00"
}

export const currentProjectInfo = (state = {}, action) => {
  switch(action.type){
    case actions.FECTCH_PROJECT_BY_ID_SUCCESS:
      return {
        name: action.project.name,
        id: action.project._id
      }
      break;
      case actions.UPDATE_PROJECT_SUCCESS:
        return {
          ...state,
          name: action.project.name
        }
        break;
      case actions.UPDATE_PROJECT_SUCCESS:
        console.log( {
          ...state,
          price: action.price
        })
        return {
          ...state,
          price: action.price
        }
        break;
    default:
      return state;
  }
}
/*
export const projectList = (state = [], action) => {
  switch(action.type){
    case(actions.FETCH_PROJECTS_SUCCESS):
      return action.projects;
      break;
    case(actions.DELETE_PROJECT_SUCCESS):
      
  }
}*/