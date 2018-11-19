/* eslint-env mocha */
/* eslint-disable import/no-extraneous-dependencies */

import assert from 'assert';
import deepFreeze from 'deep-freeze';

import * as actions from '../actions/indexActions';
import { nav } from './navReducer';

describe('nav reducer', () => {
    // Fetch Basic Info about User
  it('It should toggle saveProjectTrigger', () => {
    const initialState = {
      showSavingMessage: false,
    };

    const expectedState = {
      showSavingMessage: true,
    };

    const resultState = nav(deepFreeze(initialState), {
      type: 'UPDATE_PROJECT_REQUEST',
    });

    assert.deepEqual(resultState, expectedState);
  });

  it('It should toggle saveProjectTrigger', () => {
    const initialState = {
      showSavingMessage: true,
    };

    const expectedState = {
      showSavingMessage: false,
    };

    const resultState = nav(deepFreeze(initialState), {
      type: 'UPDATE_PROJECT_SUCCESS',
    });

    assert.deepEqual(resultState, expectedState);
  });
});
