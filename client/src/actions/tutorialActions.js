import { tutorialSteps } from 'components/design-tool/DesignToolTutorialSteps';

export const TOGGLE_TUTORIAL_MODE = 'TOGGLE_TUTORIAL_MODE';
export const toggleTutorialMode = () => ({
  type: 'TOGGLE_TUTORIAL_MODE'
});

export const UPDATE_DISABLED_ICON_EXCEPTIONS = 'UPDATE_DISABLED_ICON_EXCEPTIONS';
export const updateDisabledIconExceptions = exceptions => ({
  type: 'UPDATE_DISABLED_ICON_EXCEPTIONS',
  exceptions
});

export const TOGGLE_SHOULD_RENDER_MODAL = 'TOGGLE_SHOULD_RENDER_MODAL';
export const toggleShouldRenderModal = () => ({
  type: 'TOGGLE_SHOULD_RENDER_MODAL'
});

export const INCREMENT_STEP = 'INCREMENT_STEP';
export const incrementStep = () => ({
  type: 'INCREMENT_STEP'
});

export const incrementTutorialStep = () => {
  return (dispatch, getState) => {
    const currentStep = getState().tutorial.step
    
    if (currentStep < tutorialSteps.length - 1) {
      return dispatch(incrementStep());
    }
    
    return null;
  };
}

export const DECREMENT_STEP = 'DECREMENT_STEP';
export const decrementStep = () => ({
  type: 'DECREMENT_STEP'
});

export const decrementTutorialStep = () => {
  return (dispatch, getState) => {
    const currentStep = getState().tutorial.step
    
    if (currentStep > 0) {
      return dispatch(decrementStep());
    }
    
    return null;
  };
}
