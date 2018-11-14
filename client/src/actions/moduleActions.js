import * as actions from 'actions/indexActions';
import rotate from 'helpers/rotate';
import { centerBoundModule } from 'helpers/moduleHelpers';
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

export const rotateModule = (module, board, topLeftAnchor) => (dispatch) => {
  const { id } = module;
  const rotated = rotate(module, topLeftAnchor, board);
  const centered = centerBoundModule(rotated, module, board);

  dispatch(actions.updateEntity('Module', id, centered));
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

export const UPDATE_HOVERED_MODULE = 'UPDATE_HOVERED_MODULE';
export const updateHoveredModule = moduleData => ({
  type: 'UPDATE_HOVERED_MODULE',
  moduleData,
});
