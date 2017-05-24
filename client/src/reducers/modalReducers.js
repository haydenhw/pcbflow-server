import * as actions from 'actions/indexActions';

const defaultState = {
  shouldRenderModal: false,
  modalType: 'ONBOARD'
}

export const modal = (state = defaultState, action) => {
  switch (action.type) {
    case actions.TOGGLE_SHOULD_RENDER_MODAL:
      return {
        ...state,
        shouldRenderModal: !state.shouldRenderModal
      };
    case actions.CHANGE_MODAL_TYPE:
      return {
        ...state,
        modalType: action.modalType
      };
    
    default:
      return state;
  }
};