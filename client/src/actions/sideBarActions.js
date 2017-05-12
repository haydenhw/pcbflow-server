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