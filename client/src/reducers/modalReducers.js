import * as actions from 'actions/indexActions';
import * as types from '../constants/actionTypes';

const defaultState = {
  showModal: false,
  modalType: 'ONBOARD',
  modalProps: null,
};

export const modal = (state = defaultState, action) => {
  switch (action.type) {
    case actions.DELETE_PROJECT_REQUEST:
    case actions.TOGGLE_MODAL:
    case actions.EXIT_TUTORIAL:
      return {
        ...state,
        showModal: !state.showModal,
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
        showModal: true,
        modalType: 'CONFIRM',
        modalProps: action.modalProps,
      };
    case actions.CONFIRM_ROUTE_LEAVE:
      return {
        showModal: true,
        modalType: 'CONFIRM_ROUTE_LEAVE',
        modalProps: action.modalProps,
      };
    case actions.START_TUTORIAL:
      return {
        showModal: true,
        modalType: 'ONBOARD',
        modalProps: action.modalProps,
      };
    case types.ENTITY_DELETE:
      const { itemType } = action.payload;

      if (itemType === 'Project') {
        return {
          ...state,
          showModal: false,
        };
      }

      return state;
    default:
      return state;
  }
};
