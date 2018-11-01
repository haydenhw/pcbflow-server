/* eslint-env mocha */
/* eslint-disable import/no-extraneous-dependencies */
import assert from 'assert';
import deepFreeze from 'deep-freeze';

import * as actions from 'actions/indexActions';
import { modules, activeModules } from './moduleReducers';

describe('modules reducer', () => {
  it('It should return updated draggingModule data', () => {
    const initialState = {
      x: 10,
      y: 10,
      width: 50,
      height: 50,
      stroke: 'black',
      rotation: 0,
    };

    const expectedState = {
      x: 5,
      y: 5,
      width: 75,
      height: 75,
      stroke: 'blue',
      rotation: 90,
    };

    const resultState = modules(deepFreeze(initialState), {
      type: 'UPDATE_DRAGGING_MODULE',
      moduleData: {
        x: 5,
        y: 5,
        width: 75,
        height: 75,
        stroke: 'blue',
        rotation: 90,
      },
    });

    assert.deepEqual(resultState.dragging, expectedState);
  });

  it('It should update hoverd module position', () => {
    const initialState = {
      hovered: {
        x: 10,
        y: 10,
        width: 50,
        height: 50,
        stroke: 'black',
        rotation: 0,
      }
    }

    const expectedState = {
      x: 5,
      y: 5,
      width: 50,
      height: 50,
      stroke: 'black',
      rotation: 0,

    };

    const resultState = modules(deepFreeze(initialState), {
      type: 'UPDATE_MODULE_POSITION',
      modulePosition: {
        x: 5,
        y: 5,
      },
    });

    assert.deepEqual(resultState.hovered, expectedState);
  });

  it('It should rotate hoverd module position', () => {
    const initialState = {
      hovered: {
        x: 10,
        y: 10,
        width: 50,
        height: 50,
        stroke: 'black',
        rotation: 0,
        boundToSideIndex: 1,
        parentGroupX: 90,
        parentGroupY: 90,
        innerGroupX: 90,
        innerGroupY: 90,
      }
    }

    const expectedState = {
      x: 90,
      y: 90,
      width: 50,
      height: 50,
      stroke: 'black',
      rotation: 180,
      boundToSideIndex: 1,
      parentGroupX: 90,
      parentGroupY: 90,
      innerGroupX: 90,
      innerGroupY: 90,
    };

    const resultState = modules(deepFreeze(initialState), {
      type: 'ROTATE_HOVERED_MODULE',
      rotationData: {
        x: 90,
        y: 90,
        width: 50,
        height: 50,
        stroke: 'black',
        rotation: 180,
        boundToSideIndex: 1,
        parentGroupX: 90,
        parentGroupY: 90,
        innerGroupX: 90,
        innerGroupY: 90,
      },
    });

    assert.deepEqual(resultState.hovered, expectedState);
  });
/**/////////////////////////////////////
  it('It should update clicked module index', () => {
    const initialState = {
      clickedIndex: 2,
    };
    const expectedState = 3;

    const resultState = modules(deepFreeze(initialState), {
      type: 'UPDATE_CLICKED_MODULE',
      index: 3,
    });

    assert.deepEqual(resultState.clicked, expectedState);
  });
});


describe('draggingModule reducer', () => {
  it('It should update hoveredModule data', () => {
    const initialState = {
      x: 10,
      y: 10,
      width: 50,
      height: 50,
      stroke: 'black',
      rotation: 0,
    };

    const expectedState = {
      x: 5,
      y: 5,
      width: 75,
      height: 75,
      stroke: 'blue',
      rotation: 90,
    };

    const resultState = hoveredModule(deepFreeze(initialState), {
      type: 'UPDATE_HOVERED_MODULE',
      moduleData: {
        x: 5,
        y: 5,
        width: 75,
        height: 75,
        stroke: 'blue',
        rotation: 90,
      },
    });

    assert.deepEqual(resultState, expectedState);
  });

  it('It should update hoveredModule position', () => {
    const initialState = {
      x: 10,
      y: 10,
      width: 50,
      height: 50,
      stroke: 'black',
      rotation: 0,
    };

    const expectedState = {
      x: 5,
      y: 5,
      width: 50,
      height: 50,
      stroke: 'black',
      rotation: 0,
    };

    const resultState = hoveredModule(deepFreeze(initialState), {
      type: 'UPDATE_MODULE_POSITION',
      modulePosition: {
        x: 5,
        y: 5,
      },
    });

    assert.deepEqual(resultState, expectedState);
  });
  it('It should rotate specified module', () => {
    const initialState = [
      {
        x: 10,
        y: 10,
        width: 50,
        height: 50,
        stroke: 'black',
        rotation: 0,
        boundToSideIndex: 1,
        parentGroupX: 90,
        parentGroupY: 90,
        innerGroupX: 90,
        innerGroupY: 90,
      },
    ];

    const expectedState = [
      {
        x: 90,
        y: 90,
        width: 50,
        height: 50,
        stroke: 'black',
        rotation: 180,
        boundToSideIndex: 1,
        parentGroupX: 90,
        parentGroupY: 90,
        innerGroupX: 90,
        innerGroupY: 90,
      },
    ];

    const resultState = activeModules(deepFreeze(initialState), {
      type: 'ROTATE_HOVERED_MODULE',
      rotationData: {
        index: 0,
        x: 10,
        y: 10,
        width: 50,
        height: 50,
        stroke: 'black',
        rotation: 180,
        boundToSideIndex: 1,
        parentGroupX: 90,
        parentGroupY: 90,
        innerGroupX: 90,
        innerGroupY: 90,
      },
    });

    assert.deepEqual(resultState, expectedState);
  });
});

describe('activeModules reducer', () => {
  it('It should return correct module position', () => {
    const initialState = [
      {
        x: 10,
        y: 10,
        width: 50,
        height: 50,
        stroke: 'black',
        rotation: 0,
      },
      {
        x: 100,
        y: 100,
        width: 100,
        height: 100,
        stroke: 'black',
        rotation: 0,
      },
    ];

    const expectedState = [
      {
        x: 10,
        y: 10,
        width: 50,
        height: 50,
        stroke: 'black',
        rotation: 0,
      },
      {
        x: 50,
        y: 50,
        width: 100,
        height: 100,
        stroke: 'black',
        rotation: 0,
      },
    ];

    const resultState = activeModules(deepFreeze(initialState), {
      type: 'UPDATE_MODULE_POSITION',
      modulePosition: {
        index: 1,
        x: 50,
        y: 50,
      },
    });

    assert.deepEqual(resultState, expectedState);
  });

  it('It should return an array of modules', () => {
    const initialState = [
      {
        x: 10,
        y: 10,
        width: 50,
        height: 50,
        stroke: 'black',
        rotation: 0,
      },
    ];

    const expectedState = [
      {
        x: 10,
        y: 10,
        width: 50,
        height: 50,
        stroke: 'black',
        rotation: 0,
      },
      {
        x: 50,
        y: 50,
        width: 100,
        height: 100,
        stroke: 'black',
        rotation: 0,
      },
    ];

    const resultState = activeModules(deepFreeze(initialState), {
      type: 'FECTCH_PROJECT_BY_ID_SUCCESS',
      project: {
        modules: [
          {
            x: 10,
            y: 10,
            width: 50,
            height: 50,
            stroke: 'black',
            rotation: 0,
          },
          {
            x: 50,
            y: 50,
            width: 100,
            height: 100,
            stroke: 'black',
            rotation: 0,
          },
        ],
      },
    });

    assert.deepEqual(resultState, expectedState);
  });

  it('It should push a new module to the array', () => {
    const initialState = [
      {
        x: 10,
        y: 10,
        width: 50,
        height: 50,
        stroke: 'black',
        rotation: 0,
      },
    ];

    const expectedState = [
      {
        x: 10,
        y: 10,
        width: 50,
        height: 50,
        stroke: 'black',
        rotation: 0,
      },
      {
        x: 50,
        y: 50,
        width: 100,
        height: 100,
        stroke: 'black',
        rotation: 0,
      },
    ];

    const resultState = activeModules(deepFreeze(initialState), {
      type: 'PUSH_NEW_MODULE',
      module: {
        x: 50,
        y: 50,
        width: 100,
        height: 100,
        stroke: 'black',
        rotation: 0,
      },
    });

    assert.deepEqual(resultState, expectedState);
  });
});
