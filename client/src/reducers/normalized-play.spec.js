/* eslint-env mocha */
/* eslint-disable import/no-extraneous-dependencies */

import assert from 'assert';
import deepFreeze from 'deep-freeze';

import * as actions from 'actions/indexActions';
import { entities } from './normal-play';

const prettyPrint = (obj) => console.log(JSON.stringify(obj, null , 2));

describe('play reducer', () => {
  it('It should work', () => {
    const initialState = {
        plans: {
          1: {title: 'A', exercises: []},
        },
        exercises: {
        }
    };

    const expectedState = {
        plans: {
          1: {title: 'A', exercises: [1]},
        },
        exercises: {
          1: { title: 'exe1' },
        }

    };

    const firstState = entities(deepFreeze(initialState), {
      type: 'UPDATE_PLAN',
      id: 1,
      plan: { exercises: [1] },
    });

    const resultState = entities(deepFreeze(firstState), {
      type: 'CREATE_EXERCISE',
      id: 1,
      exercise: { title: 'exe1' },
    });
    prettyPrint(resultState)
    prettyPrint(expectedState)

    assert.deepEqual(resultState, expectedState);
  });

  it('It should work', () => {
    const initialState = {};

    const expectedState = {
        plans: {
          1: {title: 'A', exercises: []},
        },
        exercises: {
        }
    };

    const resultState = entities(deepFreeze(initialState), {
      type: 'CREATE_PLAN',
      id: 1,
      plan: {title: 'A', exercises: []},
    });

    assert.deepEqual(resultState, expectedState);
  });

});
