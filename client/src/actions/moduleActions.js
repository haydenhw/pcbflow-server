import { projectsUrl } from '../config/endpointUrls';

export const PUSH_TO_CURRENT_PROJECT_MODULES = 'PUSH_TO_CURRENT_PROJECT_MODULES';
export const pushToCurrentProjectModules = module => ({
  type: 'PUSH_TO_CURRENT_PROJECT_MODULES',
  module,
});

export const CHANGE_DRAGGING_MODULE = 'CHANGE_DRAGGING_MODULE';
export const changeDraggingModule = moduleData => ({
  type: 'CHANGE_DRAGGING_MODULE',
  moduleData,
});

export const UPDATE_MODULE_POSITION = 'UPDATE_MODULE_POSITION';
export const updateModulePosition = modulePosition => ({
  type: 'UPDATE_MODULE_POSITION',
  modulePosition,
});

export const UPDATE_MODULE_IMAGE = 'UPDATE_MODULE_IMAGE';
export const updateModuleImage = moduleData => ({
  type: 'UPDATE_MODULE_IMAGE',
  moduleData,
});

export const UPDATE_SELECTED_MODULE = 'UPDATE_SELECTED_MODULE';
export const updateSelectedModule = moduleData => ({
  type: 'UPDATE_SELECTED_MODULE',
  moduleData,
});

export const DELETE_SELECTED_MODULE = 'DELETE_SELECTED_MODULE';
export const deleteSelectedModule = moduleIndex => ({
  type: 'DELETE_SELECTED_MODULE',
  moduleIndex,
});

export const ROTATE_SELECTED_MODULE = 'ROTATE_SELECTED_MODULE';
export const rotateSelectedModule = rotationData => ({
  type: 'ROTATE_SELECTED_MODULE',
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

