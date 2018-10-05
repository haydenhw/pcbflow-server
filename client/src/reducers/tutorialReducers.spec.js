/* eslint-env mocha */
/* eslint-disable import/no-extraneous-dependencies */

import assert from 'assert';
import deepFreeze from 'deep-freeze';

import * as actions from 'actions/indexActions';
import { tutorial } from './tutorialReducers';

describe('tutorial reducer', () => {
  it('It should toggle isActive', () => {
    const initialState = {
      isActive: false,
    };

    const expectedState = {
      isActive: true,
    };

    const resultState = tutorial(deepFreeze(initialState), {
      type: 'TOGGLE_IS_TUTORIAL_ACTIVE',
    });

    assert.deepEqual(resultState, expectedState);
  });

  it('It should toggle shouldRenderTodoList', () => {
    const initialState = {
      shouldRenderTodoList: false,
    };

    const expectedState = {
      shouldRenderTodoList: true,
    };

    const resultState = tutorial(deepFreeze(initialState), {
      type: 'UPDATE_SHOULD_RENDER_TODO_LIST',
      bool: true,
    });

    assert.deepEqual(resultState, expectedState);
  });

  it('It should toggle shouldRenderTodoList', () => {
    const initialState = {
      isActive: false,
      isComplete: false,
      shouldRenderTodoList: false,
      disabledIconExceptions: null,
      step: 0,
      previousStep: null,
      todoBools: [false, false, false, false, false],
    };

    const expectedState = {
      isActive: true,
      isComplete: false,
      shouldRenderTodoList: true,
      disabledIconExceptions: null,
      step: 0,
      previousStep: null,
      todoBools: [false, false, false, false, false],
    };

    const resultState = tutorial(deepFreeze(initialState), {
      type: 'EXIT_TUTORIAL',
      bool: true,
    });

    assert.deepEqual(resultState, expectedState);
  });

  it('It should toggle update disabledIconExceptions', () => {
    const initialState = {
      isActive: false,
      isComplete: false,
      shouldRenderTodoList: false,
      disabledIconExceptions: null,
      step: 0,
      previousStep: null,
      todoBools: [false, false, false, false, false],
    };

    const expectedState = {
      isActive: false,
      isComplete: false,
      shouldRenderTodoList: false,
      disabledIconExceptions: ['101', '102'],
      step: 0,
      previousStep: null,
      todoBools: [false, false, false, false, false],
    };
    const resultState = tutorial(deepFreeze(initialState), {
      type: 'UPDATE_DISABLED_ICON_EXCEPTIONS',
      exceptions: ['101', '102'],
    });

    assert.deepEqual(resultState, expectedState);
  });

  it('It should toggle update update todoBools array', () => {
    const initialState = {
      isActive: false,
      isComplete: false,
      shouldRenderTodoList: false,
      disabledIconExceptions: null,
      step: 0,
      previousStep: null,
      todoBools: [false, false, false, false, false],
    };

    const expectedState = {
      isActive: false,
      isComplete: false,
      shouldRenderTodoList: false,
      disabledIconExceptions: null,
      step: 0,
      previousStep: null,
      todoBools: [false, false, false, false, true],
    };
    const resultState = tutorial(deepFreeze(initialState), {
      type: 'COMPLETE_TODO',
      index: 4,
    });

    assert.deepEqual(resultState, expectedState);
  });
});
