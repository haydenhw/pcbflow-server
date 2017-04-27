/* eslint-env mocha */
/* eslint-disable import/no-extraneous-dependencies */

import assert from 'assert';
import deepFreeze from 'deep-freeze';


import * as actions from 'actions/indexActions';
import { projectList} from './projectReducers';

describe('project redcuer', () => {
    // Fetch Basic Info about User
    it('It should set basic info about user', () => {
        const initialState = [];

        const expectedState = [1, 2, 3]

        const resultState = projectList(deepFreeze(initialState), {
            type: 'FETCH_PROJECTS_SUCCESS',
            projects: [1, 2, 3],

        });

        assert.deepEqual(resultState, expectedState);
    });
});
