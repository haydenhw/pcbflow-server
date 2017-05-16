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
    const { dependencies, name, index } = action.dependencyData;
    return {
      ...state,
      dependencies: dependencies,
      moduleName: name,
      index: index
    };
    default:
      return state;
  };
}


