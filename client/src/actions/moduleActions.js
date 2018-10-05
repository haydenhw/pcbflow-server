import { projectsUrl } from '../config/endpointUrls';
import * as actions from 'actions/indexActions';

export const PUSH_NEW_MODULE = 'PUSH_NEW_MODULE';
export const pushNewModule = module => ({
  type: 'PUSH_NEW_MODULE',
  module,
});

export const pushToactiveModules = module => (dispatch, getState) => {
  const { step, isTutorialActive } = getState().tutorial;

  if (isTutorialActive) {
    switch (step) {
      case 4:
      case 7:
      case 10:
        dispatch(actions.updateDisabledIconExceptions(null));
        setTimeout(() => dispatch(actions.toggleModal()), 700);
        break;
      case 13:
        dispatch(actions.completeTodo(module.id));
        break;
      default:
          // do nothing
    }
  }

  dispatch(actions.pushNewModule(module));
};

export const UPDATE_DRAGGING_MODULE = 'UPDATE_DRAGGING_MODULE';
export const updateDraggingModule = moduleData => ({
  type: 'UPDATE_DRAGGING_MODULE',
  moduleData,
});

export const UPDATE_CLICKED_MODULE = 'UPDATE_CLICKED_MODULE';
export const updateClickedModuleIndex = index => ({
  type: 'UPDATE_CLICKED_MODULE',
  index,
});

export const UPDATE_MODULE_POSITION = 'UPDATE_MODULE_POSITION';
export const updateModulePosition = modulePosition => ({
  type: 'UPDATE_MODULE_POSITION',
  modulePosition,
});

export const UPDATE_MODULE_FILL = 'UPDATE_MODULE_FILL';
export const updateModuleFill = moduleFill => ({
  type: 'UPDATE_MODULE_FILL',
  moduleFill,
});

export const UPDATE_MODULE_STROKE = 'UPDATE_MODULE_STROKE';
export const updateModuleStroke = moduleStroke => ({
  type: 'UPDATE_MODULE_STROKE',
  moduleStroke,
});

export const UPDATE_MODULE_IMAGE = 'UPDATE_MODULE_IMAGE';
export const updateModuleImage = moduleData => ({
  type: 'UPDATE_MODULE_IMAGE',
  skipPrevState: true,
  moduleData,
});

export const UPDATE_HOVERED_MODULE = 'UPDATE_HOVERED_MODULE';
export const updateHoveredModule = moduleData => ({
  type: 'UPDATE_HOVERED_MODULE',
  moduleData,
});

export const DELETE_HOVERED_MODULE = 'DELETE_HOVERED_MODULE';
export const deleteHoveredModule = (moduleIndex) => (dispatch, getState) => {
  const currentModulesLength = getState().activeModules.present.length;

  if (currentModulesLength === 1) {
    dispatch(actions.updateBoardStroke(null));
  }

  dispatch({
    type: 'DELETE_HOVERED_MODULE',
    moduleIndex,
  });
}

export const ROTATE_HOVERED_MODULE = 'ROTATE_HOVERED_MODULE';
export const rotateHoveredModule = rotationData => ({
  type: 'ROTATE_HOVERED_MODULE',
  rotationData,
});

export const SAVE_MODULE_POSITION_SUCCESS = 'SAVE_MODULE_POSITION_SUCCESS';
export const saveModulePositionSuccess = modules => ({
  type: 'SAVE_MODULE_POSITION_SUCCESS',
  modules,
});

export function saveModulePosition(
  url,
  { method: PUT },
  ) {
  return (dispatch) => {
    fetch(url)
    .then(res => res.json())
    .then((data) => {
      dispatch({
        type: 'SAVE_MODULE_POSITION_SUCCESS',
        data });
    })
    .catch((err) => {
      console.error(err);
    });
  };
}
