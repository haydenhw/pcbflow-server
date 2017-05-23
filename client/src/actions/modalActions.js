export const TOGGLE_SHOULD_RENDER_MODAL = 'TOGGLE_SHOULD_RENDER_MODAL';
export const toggleShouldRenderModal = () => ({
  type: 'TOGGLE_SHOULD_RENDER_MODAL'
});

export const CHANGE_MODAL_TYPE = 'CHANGE_MODAL_TYPE';
export const changeModalType = (modalType) => ({
  type: 'CHANGE_MODAL_TYPE',
  modalType
});