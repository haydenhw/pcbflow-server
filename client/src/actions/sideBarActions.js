export const UPDATE_SHOW_ALL_ICONS = 'UPDATE_SHOW_ALL_ICONS';
export const updateShowAllIcons = bool => ({
  type: 'UPDATE_SHOW_ALL_ICONS',
  bool,
});

export const TOGGLE_SHOULD_RENDER_SIDEBAR = 'TOGGLE_SHOULD_RENDER_SIDEBAR';
export const toggleShouldRenderSideBar = bool => ({
  type: 'TOGGLE_SHOULD_RENDER_SIDEBAR',
  bool,
});

export const TOGGLE_HAS_TOOLTIP = 'TOGGLE_HAS_TOOLTIP';
export const toggleHasTooltip = id => ({
  type: 'TOGGLE_HAS_TOOLTIP',
  id,
});
