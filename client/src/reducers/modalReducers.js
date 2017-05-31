import * as actions from 'actions/indexActions';

const defaultState = {
  shouldRenderModal: false,
  modalType: 'ONBOARD',
  modalProps: null,
};

export const modal = (state = defaultState, action) => {
  switch (action.type) {
    case actions.TOGGLE_SHOULD_RENDER_MODAL:
    case actions.DELETE_PROJECT_REQUEST:
    case actions.EXIT_TUTORIAL:
      return {
        ...state,
        shouldRenderModal: !state.shouldRenderModal,
      };
    case actions.CHANGE_MODAL_TYPE:
      return {
        ...state,
        modalType: action.modalType,
      };
    case actions.UPDATE_MODAL_PROPS:
      return {
        ...state,
        modalProps: action.modalProps,
      };
    case actions.CONFIRM_PROJECT_DELETE:
      return {
        shouldRenderModal: true,
        modalType: 'CONFIRM',
        modalProps: action.modalProps,
      };

    default:
      return state;
  }
};
