export const TRIGGER_ANCHOR_UPDATE = 'TRIGGER_ANCHOR_UPDATE';
export const triggerAnchorUpdate = () => ({
  type: 'TRIGGER_ANCHOR_UPDATE',
});

export const UPDATE_ANCHOR_POSITIONS = 'UPDATE_ANCHOR_POSITIONS';
export const updateAnchorPositions = positions => ({
  type: 'UPDATE_ANCHOR_POSITIONS',
  positions,
});
