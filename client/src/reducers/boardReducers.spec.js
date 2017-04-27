/* eslint-env mocha */
/* eslint-disable import/no-extraneous-dependencies */

import assert from 'assert';
import deepFreeze from 'deep-freeze';

import * as actions from 'actions/indexActions';
import { boardSpecs } from './boardReducers';

describe('boardSpecs reducer', () => {
    // Fetch Basic Info about User
  it('It should return info about the board', () => {
    const initialState = {
      x: 10,
      y: 10,
      width: 600,
      height: 300,
    };

    const expectedState = {
      x: 10,
      y: 10,
      width: 105,
      height: 34,
    };

    const resultState = boardSpecs(deepFreeze(initialState), {
      type: 'UPDATE_BOARD_DIMENSIONS',
      dimensions: {
        width: 105,
        height: 34,
      },
    });

    assert.deepEqual(resultState, expectedState);
  });
});

