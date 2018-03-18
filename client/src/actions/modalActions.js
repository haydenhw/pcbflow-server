import { devMode } from 'config/devMode';

export const TOGGLE_MODAL = 'TOGGLE_MODAL';
export const toggleModal = () => ({
  type: 'TOGGLE_MODAL',
});

export const CHANGE_MODAL_TYPE = 'CHANGE_MODAL_TYPE';
export const changeModalType = modalType => ({
  type: 'CHANGE_MODAL_TYPE',
  modalType,
});

export const UPDATE_MODAL_PROPS = 'UPDATE_MODAL_PROPS';
export const updateModalProps = modalProps => ({
  type: 'UPDATE_MODAL_PROPS',
  modalProps,
});

export const CONFIRM_PROJECT_DELETE = 'CONFIRM_PROJECT_DELETE';
export const confirmProjectDelete = modalProps => ({
  type: 'CONFIRM_PROJECT_DELETE',
  modalProps,
  modalType: 'CONFIRM',
});

export const CONFIRM_ROUTE_LEAVE = 'CONFIRM_ROUTE_LEAVE ';
export const confirmRouteLeave = modalProps => ({
  type: 'CONFIRM_ROUTE_LEAVE ',
  modalProps,
  modalType: 'CONFIRM_ROUTE_LEAVE',
});

export const START_TUTORIAL = 'START_TUTORIAL';
export const startTutorial = () => ({
  type: 'START_TUTORIAL',
});

export const startTutorialIfNotOffered = () => (dispatch) => {
  const wasTutorialOffered = sessionStorage.getItem('wasTutorialOffered');

  if (!wasTutorialOffered && devMode === false) {
    setTimeout(() => dispatch(startTutorial()), 500);
    sessionStorage.setItem('wasTutorialOffered', true);
  }
}
