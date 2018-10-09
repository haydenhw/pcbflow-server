/* eslint-env mocha */
/* eslint-disable import/no-extraneous-dependencies */

import assert from 'assert';
import deepFreeze from 'deep-freeze';

import orm from '../schema/schema';

import * as actions from '../actions/indexActions';
import { entities } from './entitiesReducers';

const initialState = orm.getEmptyState();

describe('entities reducer', () => {
  it('It should add a new entities', () => {
    // const initialState = [
    //   {
    //     x: 10,
    //     y: 10,
    //     width: 50,
    //     height: 50,
    //     stroke: 'black',
    //     rotation: 0,
    //   },
    // ];

    const expectedState = [
      {
        x: 50,
        y: 50,
        width: 100,
        height: 100,
        stroke: 'black',
        rotation: 0,
        project: 1,
      },
    ];

    const resultState = entities(deepFreeze(initialState), {
      type: 'ENTITY_CREATE',
      payload: {
        itemType: 'Module',
        newItemAttributes: {
          x: 50,
          y: 50,
          width: 100,
          height: 100,
          stroke: 'black',
          rotation: 0,
          project: 1,
        },
      },
    });

    assert.deepEqual(resultState, expectedState);
  });
});
