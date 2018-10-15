/* eslint-env mocha */
/* eslint-disable import/no-extraneous-dependencies */

import assert from 'assert';
import deepFreeze from 'deep-freeze';

import * as actions from 'actions/indexActions';
import { projects, activeProjectInfo } from './projectReducers';

describe('projects reducer', () => {
  it('It should return a list of projects', () => {
    const initialState = {
      isFetching: false,
      items: [],
    };

    const expectedState = {
      isFetching: false,
      items: [1, 2, 3],
    };

    const resultState = projects(deepFreeze(initialState), {
      type: 'FETCH_PROJECTS_SUCCESS',
      projects: [1, 2, 3],

    });

    assert.deepEqual(resultState, expectedState);
  });

  it('It should set activeProject', () => {
    const initialState = {
      activeProjectId: 3,
    }

    const expectedState = {
      activeProjectId: 1,
    }

    const action = actions.createEntity('Project', {
        name: "new project",
        id: 1,
      }
    );
    const resultState = projects(deepFreeze(initialState), action);

    assert.deepEqual(resultState, expectedState);
  });
});

describe('activeProjectInfo redcuers', () => {
  it('It should return info a about the current project', () => {
    const initialState = {
      price: '$15.00',
    };

    const expectedState = {
      price: '$15.00',
      name: 'hola',
      id: 1234321,
    };

    const resultState = activeProjectInfo(deepFreeze(initialState), {
      type: 'FECTCH_PROJECT_BY_ID_SUCCESS',
      project: {
        price: '$15.00',
        name: 'hola',
        _id: 1234321,
      },
    });

    assert.deepEqual(resultState, expectedState);
  });

  it('It should update the name of the current project', () => {
    const initialState = {
      price: '$15.00',
      name: 'hola',
      id: 1234321,
    };

    const expectedState = {
      price: '$15.00',
      name: 'new name',
      id: 1234321,
    };

    const resultState = activeProjectInfo(deepFreeze(initialState), {
      type: 'UPDATE_PROJECT_SUCCESS',
      project: {
        name: 'new name',
      },
    });

    assert.deepEqual(resultState, expectedState);
  });

  it('It should update the price of the current project', () => {
    const initialState = {
      price: '$15.00',
      name: 'hola',
      id: 1234321,
    };

    const expectedState = {
      price: '$25.00',
      name: 'hola',
      id: 1234321,
    };

    const resultState = activeProjectInfo(deepFreeze(initialState), {
      type: 'UPDATE_PROJECT_PRICE',
      price: '$25.00',
    });

    assert.deepEqual(resultState, expectedState);
  });

  it('It should update the time project was last saved', () => {
    const initialState = {
      price: '$15.00',
      name: 'hola',
      timeLastSaved: '5pm',
      id: 1234321,
    };

    const expectedState = {
      price: '$15.00',
      name: 'hola',
      timeLastSaved: '6pm',
      id: 1234321,
    };

    const resultState = activeProjectInfo(deepFreeze(initialState), {
      type: 'UPDATE_LAST_SAVED_TIME',
      time: '6pm',
    });

    assert.deepEqual(resultState, expectedState);
  });
});
