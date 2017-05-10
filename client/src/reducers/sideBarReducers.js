import * as actions from '../actions/indexActions';

const defaultIconsVibility = {
  iconVisibity: 'ALL',
  dependencies: []
}

export const iconVisibity = (state = defaultIconsVibility, action) => {
  switch (action.type) {
    case actions.UPDATE_ICON_VISBILITY:
    return {
      ...state,
      iconVisibity: action.mode
    };
    
    case actions.UPDATE_CURRENT_DEPENDENCIES:
    return {
      ...state,
      dependencies: action.dependencies
    };
    default:
      return state;
  };
}


