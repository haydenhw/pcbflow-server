import assert from 'assert';
import deepFreeze from 'deep-freeze';

import * as actions from 'actions/indexActions';
import { mouseEvents } from './mouseEventReducers';

describe('mouseEvents reducer', () => {
  it('It should return true if mouse is down on an icon', () => {
    const initialState = {
      isMouseOverModule: false,
      isMouseDownOnIcon: false,
      isMouseDown: false,
      isContextMenuOpen: false,
    };

    const expectedState = {
      isMouseOverModule: false,
      isMouseDownOnIcon: true,
      isMouseDown: false,
      isContextMenuOpen: false,
    };

    const resultState = mouseEvents(deepFreeze(initialState), {
      type: 'MOUSE_DOWN_ON_ICON',
      isDown: true,
    });

    assert.deepEqual(resultState, expectedState);
  });

  it('It should return toggle the current state value if mouse is down', () => {
    const initialState = {
      isMouseOverModule: false,
      isMouseDownOnIcon: false,
      isMouseDown: false,
      isContextMenuOpen: false,
    };

    const expectedState = {
      isMouseOverModule: false,
      isMouseDownOnIcon: false,
      isMouseDown: true,
      isContextMenuOpen: false,
    };

    const resultState = mouseEvents(deepFreeze(initialState), {
      type: 'TOGGLE_IS_MOUSE_DOWN',
      isDown: true,
    });

    assert.deepEqual(resultState, expectedState);
  });

  it('It should return toggle the current state value if mouse over a ', () => {
    const initialState = {
      isMouseOverModule: false,
      isMouseDownOnIcon: false,
      isMouseDown: false,
      isContextMenuOpen: false,
    };

    const expectedState = {
      isMouseOverModule: true,
      isMouseDownOnIcon: false,
      isMouseDown: false,
      isContextMenuOpen: false,
    };

    const resultState = mouseEvents(deepFreeze(initialState), {
      type: 'TOGGLE_IS_MOUSE_OVER_MODULE',
      isOver: true,
    });

    assert.deepEqual(resultState, expectedState);
  });
});
