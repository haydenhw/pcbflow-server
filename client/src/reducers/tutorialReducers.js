import * as actions from 'actions/indexActions';

const defaultState = {
  isTutorialModeActive: false,
  isTutorialComplete: false, 
  shouldRenderModal: false,
  shouldRenderTodoList: true, 
  disabledIconExceptions: null,
  step: 9,
  todoBools:[false, false, false, false]
  ]
}

export const tutorial = (state = defaultState, action) => {
  switch (action.type) {
    case actions.TOGGLE_TUTORIAL_MODE:
      return {
        ...state,
        isTutorialModeActive: !state.isTutorialModeActive
      };
    case actions.TOGGLE_SHOULD_RENDER_MODAL:
      return {
        ...state,
        shouldRenderModal: !state.shouldRenderModal
      };
    case actions.UPDATE_DISABLED_ICON_EXCEPTIONS:
      return {
        ...state,
        disabledIconExceptions: action.exceptions
      };
    case actions.INCREMENT_STEP:
      return {
        ...state,
        step: state.step + 1,
      };
    case actions.DECREMENT_STEP:
      return {
        ...state,
        step: state.step - 1,
      };
    case actions.COMPLETE_TUTORIAL:
      const { index } = action.index;
      const newArray = state.map((bool, i) => {
        return i === index ? true : bool;
      })
      return newArray;
    default:
      return state;
  }
};

