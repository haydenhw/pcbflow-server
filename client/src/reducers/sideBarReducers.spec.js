/* eslint-env mocha */
/* eslint-disable import/no-extraneous-dependencies */

import assert from 'assert';
import deepFreeze from 'deep-freeze';

import * as actions from 'actions/indexActions';
import { sideBar } from './sideBarReducers';

describe('sideBar reducer', () => {
  it('It should toggle show bool', () => {
    const initialState = {
      show: false;
    };

    const expectedState = {
      show: true,
    };

    const resultState = sideBar(deepFreeze(initialState), {
      type: 'TOGGLE_SIDEBAR',
    });

    assert.deepEqual(resultState, expectedState);
  });

  it('It should toggle showAllIcons bool', () => {
    const initialState = {
      showAllIcons: false,
    };

    const expectedState = {
      showAllIcons: true,
    };

    const resultState = sideBar(deepFreeze(initialState), {
      type: 'UPDATE_SHOW_ALL_ICONS',
    });

    assert.deepEqual(resultState, expectedState);
  });
});
