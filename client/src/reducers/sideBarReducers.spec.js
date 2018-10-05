import assert from 'assert';
import deepFreeze from 'deep-freeze';

import * as actions from 'actions/indexActions';
import { iconVisibity, shouldRenderSideBar, moduleData } from './sideBarReducers';

describe('iconVisibity reducer', () => {
  it('It should update visible icons', () => {
    const initialState = {
      mode: 'ALL',
      dependencies: [],
    };

    const expectedState = {
      mode: 'DEPENDECY',
      dependencies: [],
    };

    const resultState = iconVisibity(deepFreeze(initialState), {
      type: 'UPDATE_ICON_VISBILITY',
      mode: 'DEPENDECY',
    });

    assert.deepEqual(resultState, expectedState);
  });

  it('It should update dependency array', () => {
    const initialState = {
      mode: 'ALL',
      dependencies: [],
    };

    const expectedState = {
      mode: 'ALL',
      dependencies: ['101', '102'],
      index: 3,
      moduleName: 'COM',
    };

    const resultState = iconVisibity(deepFreeze(initialState), {
      type: 'UPDATE_CURRENT_DEPENDENCIES',
      dependencyData: {
        dependencies: ['101', '102'],
        index: 3,
        text: 'COM',
      },

    });

    assert.deepEqual(resultState, expectedState);
  });
});

describe('shouldRenderSideBar reducer', () => {
  it('It should toggle shouldRenderSideBar boolean ', () => {
    const initialState = false;

    const expectedState = true;

    const resultState = shouldRenderSideBar(deepFreeze(initialState), {
      type: 'TOGGLE_SHOULD_RENDER_SIDEBAR',
      bool: true,
    });

    assert.deepEqual(resultState, expectedState);
  });
});
