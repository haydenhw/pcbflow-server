/* eslint-env mocha */
/* eslint-disable import/no-extraneous-dependencies */

import assert from 'assert';
import deepFreeze from 'deep-freeze';

import * as actions from 'actions/indexActions';
import { contextMenu } from './contextMenuReducer';

describe('contextMenu reducer', () => {
  it('It should toggle show boolean', () => {
    const initialState = {
      show: false,
    };

    const expectedState = {
      show : true,
    };

    const resultState = contextMenu(deepFreeze(initialState), {
      type: 'TOGGLE_IS_CONTEXT_MENU_OPEN',
    });

    assert.deepEqual(resultState, expectedState);
  });
});
