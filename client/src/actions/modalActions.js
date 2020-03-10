import store from 'reduxFiles/store';
import * as actions from 'actions/indexActions';
import { devMode } from 'config/devMode';
import { getTutorialProject } from 'helpers/tutorialHelpers';

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
export const startTutorial = () => (dispatch, getState) => {
  const state = getState();
  const projects = state.projects.items;
  const tutorialProject = getTutorialProject(state);

  if (tutorialProject) {
    dispatch(actions.setActiveProject(projects, tutorialProject._id, true))
  } else {
    dispatch(actions.createNewProject('Tutorial Project', { isTutorialProject: true }));
  }

  dispatch(actions.triggerAnchorUpdate());
  dispatch(actions.triggerBoardUpdate());
  dispatch({ type: 'START_TUTORIAL' });
};

export const OFFER_TUTORIAL = 'OFFER_TUTORIAL';
export const offerTutorial = () => ({
  type: 'OFFER_TUTORIAL',
});

export const offerTutorialIfInitialVisit = () => (dispatch) => {
  const isFirstUserVisit = localStorage.getItem('isFirstUserVisit');

  if ((isFirstUserVisit === null) && (devMode === false)) {
    setTimeout(() => dispatch(offerTutorial()), 500);
    localStorage.setItem('isFirstUserVisit', false);
  }
}

export const TOGGLE_MODAL = 'TOGGLE_MODAL';
export const toggleModal = () => ({
  type: 'TOGGLE_MODAL',
});
