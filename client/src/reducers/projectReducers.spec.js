/* eslint-env mocha */
/* eslint-disable import/no-extraneous-dependencies */

import assert from 'assert';
import deepFreeze from 'deep-freeze';

import * as actions from 'actions/indexActions';
import { projectList, currentProjectInfo } from './projectReducers';

describe('projectList reducer', () => {
    // Fetch Basic Info about User
  it('It should return a list of projects', () => {
    const initialState = [];

    const expectedState = [1, 2, 3];

    const resultState = projectList(deepFreeze(initialState), {
      type: 'FETCH_PROJECTS_SUCCESS',
      projects: [1, 2, 3],

    });

    assert.deepEqual(resultState, expectedState);
  });
});

describe('currentProjectInfo redcuers', () => {
  it('It should return info a about the current project', () => {
    const initialState = {
      price: '$15.00',
    };

    const expectedState = {
      price: '$15.00',
      name: 'hola',
      id: 1234321,
    };

    const resultState = currentProjectInfo(deepFreeze(initialState), {
      type: 'FECTCH_PROJECT_BY_ID_SUCCESS',
      project: {
        price: '$15.00',
        name: 'hola',
        _id: 1234321,
      },
    });
    console.log(resultState);

    assert.deepEqual(resultState, expectedState);
  });
});
