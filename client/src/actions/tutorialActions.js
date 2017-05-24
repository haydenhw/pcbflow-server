import * as actions from 'actions/indexActions'
import { tutorialSteps } from 'components/design-tool/DesignToolTutorialSteps';

export const TOGGLE_IS_TUTORIAL_ACTIVE = 'TOGGLE_IS_TUTORIAL_ACTIVE';
export const toggleTutorialIsActive = () => ({
  type: 'TOGGLE_IS_TUTORIAL_ACTIVE'
});

export const exitTutorial = () => {
  return (dispatch, getState) => {
    dispatch(actions.toggleTutorialIsActive());
    dispatch(actions.toggleShouldRenderModal());
    dispatch(updateShouldRenderTodoList(false));
  }
}

export const UPDATE_DISABLED_ICON_EXCEPTIONS = 'UPDATE_DISABLED_ICON_EXCEPTIONS';
export const updateDisabledIconExceptions = exceptions => ({
  type: 'UPDATE_DISABLED_ICON_EXCEPTIONS',
  exceptions
});

export const UPDATE_SHOULD_RENDER_TODO_LIST = 'UPDATE_SHOULD_RENDER_TODO_LIST';
export const updateShouldRenderTodoList = (bool) => ({
  type: 'UPDATE_SHOULD_RENDER_TODO_LIST',
  bool
});

export const SHOW_TUTORIAL_EXIT_SCREEN = 'SHOW_TUTORIAL_EXIT_SCREEN';
export const showTutorialExitScreen = () => ({
  type: 'SHOW_TUTORIAL_EXIT_SCREEN'
});

export const RESUME_TUTORIAL = 'RESUME_TUTORIAL';
export const resumeTutorial = () => {
  return (dispatch, getState) => {
    dispatch(actions.changeModalType('ONBOARD'))
    dispatch({
      type: 'RESUME_TUTORIAL',
    })
  }
}

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

export const COMPLETE_TODO = 'COMPLETE_TODO';
export const completeSpecifiedTodo = (index) => ({
  type: 'COMPLETE_TODO',
  index
});

export const completeTutorial = () => {
  return (dispatch, getState) => {
    dispatch(actions.toggleShouldRenderModal());
  };
}

function getIndex(id) {
  const idIndexMap = {
    '106': 0,
    '101': 1,
    '112': 2,
    '107': 3,
    '108': 4
  }
  
  return idIndexMap[id];
}

export const completeTodo = (id) => {
  return (dispatch, getState) => {
    const todoBools = getState().tutorial.todoBools;
    const trueCount = todoBools.filter(bool => bool === true).length;
    const todoIndex = getIndex(id); 
    
    dispatch(completeSpecifiedTodo(todoIndex));
  
    if (trueCount === 4) {
      dispatch(actions.toggleShouldRenderModal());
    }
    
    return null;
  };
}
