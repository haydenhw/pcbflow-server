/* eslint-env mocha */
/* eslint-disable import/no-extraneous-dependencies */

import assert from 'assert';
import deepFreeze from 'deep-freeze';

import * as actions from 'actions/indexActions';
import { triggers } from './triggersReducers';

describe('triggers reducer', () => {
    // Fetch Basic Info about User
  it('It should toggle saveProjectTrigger', () => {
    const initialState = {
      saveProjectTrigger: false,
    };

    const expectedState = {
      saveProjectTrigger: true,
      updateThumbnailTrigger: true,
    };

    const resultState = triggers(deepFreeze(initialState), {
      type: 'UPDATE_PROJECT_NAME',
    });

    assert.deepEqual(resultState, expectedState);
  });
});
