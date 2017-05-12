import * as actions from '../actions/indexActions';

const defaultIconsVibility = {
  mode: 'ALL',
  dependencies: []
}

export const iconVisibity = (state = defaultIconsVibility, action) => {
  switch (action.type) {
    case actions.UPDATE_ICON_VISBILITY:
    return {
      ...state,
      mode: action.mode
    };
    
    case actions.UPDATE_CURRENT_DEPENDENCIES:
    console.log(action)
    console.log({
      ...state,
      dependencies: action.dependencyData.dependencies,
      moduleName: action.dependencyData.name
    })
    return {
      ...state,
      dependencies: action.dependencyData.dependencies,
      moduleName: action.dependencyData.name
    };
    default:
      return state;
  };
}


