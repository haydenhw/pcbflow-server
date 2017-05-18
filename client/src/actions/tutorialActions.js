export const TOGGLE_TUTORIAL_MODE = 'TOGGLE_TUTORIAL_MODE';
export const toggleTutorialMode = () => ({
  type: 'TOGGLE_TUTORIAL_MODE'
});

export const UPDATE_DISABLED_ICON_EXCEPTIONS = 'UPDATE_DISABLED_ICON_EXCEPTIONS';
export const updateDisabledIconExceptions = (exceptions) => ({
  type: 'UPDATE_DISABLED_ICON_EXCEPTIONS',
  excpetions
});

export const INCREMENT_TUTORIAL_STEP = 'INCREMENT_TUTORIAL_STEP';
export const incrementTutorialStep = () => ({
  type: 'INCREMENT_TUTORIAL_STEP'
});

export const DECREMENT_TUTORIAL_STEP = 'INCREMENT_TUTORIAL_STEP';
export const decrementTutorialStep = () => ({
  type: 'INCREMENT_TUTORIAL_STEP'
});