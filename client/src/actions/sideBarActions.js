export const UPDATE_ICON_VISBILITY = 'UPDATE_ICON_VISBILITY';
export const updateIconVisibity = mode => ({
  type: 'UPDATE_ICON_VISBILITY',
  mode,
});

export const UPDATE_CURRENT_DEPENDENCIES = 'UPDATE_CURRENT_DEPENDENCIES';
export const updateCurrentDependencies = dependencyData => ({
  type: 'UPDATE_CURRENT_DEPENDENCIES',
  dependencyData,
});

export const TOGGLE_SHOULD_RENDER_SIDEBAR = 'TOGGLE_SHOULD_RENDER_SIDEBAR';
export const ToggleShouldRenderSideBar = () => ({
  type: 'TOGGLE_SHOULD_RENDER_SIDEBAR'
});