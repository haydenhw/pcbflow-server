const shouldUpdate = (
  actions.UPDATE_SELECTED_MODULE ||
  actions.PUSH_TO_CURRENT_PROJECT_MODULES ||
  actions.UPDATE_MODULE_POSITION ||
  actions.ROTATE_SELECTED_MODULE
);

const defaultState = {
  hasUnsavedChanges: false
}

export const moduleBank = (state = defaultState, action) => {
  switch(action.type) {
    case actions.FECTCH_PROJECT_BY_ID_SUCCESS:
       return action.project.moduleBank;
       break;
      
   default:
     return state;
 }
}