import * as actions from '../actions/indexActions';

const defaultIconsVibility = {
  mode: 'ALL',
  dependencies: []
}

export const iconVisibity = (state = defaultIconsVibility, action) => {
  switch (action.type) {
    case actions.UPDATE_ICON_VISBILITY:
    console.log(action)
    return {
      ...state,
      mode: action.mode
    };
    
    case actions.UPDATE_CURRENT_DEPENDENCIES:
    const { dependencies, text, index } = action.dependencyData;
    return {
      ...state,
      dependencies,
      index,
      moduleName: text,
    };
    default:
      return state;
  };
}


