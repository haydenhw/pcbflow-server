import store from '../redux-files/store';
import * as actions from 'actions/indexActions';
import { getActiveProject } from '../selectors/projectSelectors';

export const pushToactiveModules = module => (dispatch, getState) => {
  const state = getState();
  const { step, isTutorialActive } = state.tutorial;
  const activeProjectId = getActiveProject(state).id;

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

  const newModule = Object.assign({}, module, { project: activeProjectId });
  dispatch(actions.createEntity('Module', newModule));
};

export const UPDATE_DRAGGING_MODULE = 'UPDATE_DRAGGING_MODULE';
export const updateDraggingModule = (
  (draggingModule, clientX, clientY) => (dispatch) => {
    const { width, height } = draggingModule;
    const adjustedDraggingModule = Object.assign({}, draggingModule, {
      moduleX: clientX - (width / 2),
      moduleY: clientY - (height / 2),
    });

    dispatch({
      type: 'UPDATE_DRAGGING_MODULE',
      dragginModule: adjustedDraggingModule,
    });
  }
);

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

export const UPDATE_HOVERED_MODULE = 'UPDATE_HOVERED_MODULE';
export const updateHoveredModule = moduleData => ({
  type: 'UPDATE_HOVERED_MODULE',
  moduleData,
});

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
