import * as actions from '../actions/indexActions';

const shouldUpdate = (
  actions.UPDATE_SELECTED_MODULE ||
  actions.PUSH_TO_CURRENT_PROJECT_MODULES ||
  actions.UPDATE_MODULE_POSITION ||
  actions.ROTATE_SELECTED_MODULE
);




const defaultState = {
  hasUnsavedChanges: false
}

export const testReducer = (state = defaultState, action) => {
  switch(action.type) {
    case actions.UPDATE_SELECTED_MODULE:
    case actions.PUSH_TO_CURRENT_PROJECT_MODULES:
    case actions.PUSH_TO_CURRENT_PROJECT_MODULES:
    case actions.PUSH_TO_CURRENT_PROJECT_MODULES:
    
        
       return action.project.moduleBank;
       break;
       
      
   default:
     return state;
 }
}

documn