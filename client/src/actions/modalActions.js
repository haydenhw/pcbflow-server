import { devMode } from 'config/devMode';

export const CONFIRM_PROJECT_DELETE = 'CONFIRM_PROJECT_DELETE';
export const confirmProjectDelete = modalProps => ({
  type: 'CONFIRM_PROJECT_DELETE',
  modalProps,
  modalType: 'CONFIRM',
});

export const CHANGE_MODAL_TYPE = 'CHANGE_MODAL_TYPE';
export const changeModalType = modalType => ({
  type: 'CHANGE_MODAL_TYPE',
  modalType,
});

export const START_TUTORIAL = 'START_TUTORIAL';
export const startTutorial = () => ({
  type: 'START_TUTORIAL',
});

export const startTutorialIfNotOffered = () => (dispatch) => {
  const wasTutorialOffered = localStorage.getItem('wasTutorialOffered');

  if (!wasTutorialOffered && devMode === false) {
    setTimeout(() => dispatch(startTutorial()), 500);
    localStorage.setItem('wasTutorialOffered', true);
  }
}

export const TOGGLE_MODAL = 'TOGGLE_MODAL';
export const toggleModal = () => ({
  type: 'TOGGLE_MODAL',
});
