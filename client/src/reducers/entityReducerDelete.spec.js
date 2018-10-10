import { expect } from 'chai';
import { getSessionWithTestData } from '../test/utils';
import  orm from '../schema/schema';
import  { deleteEntity }from '../actions/indexActions';
import { ENTITY_CREATE } from '../constants/actionTypes';
import { entity } from './entityReducer';

describe('entity reducer delete', function () {
  let session;
    beforeEach(done => {
      getSessionWithTestData().then(sessionWithTestData => {
        session = sessionWithTestData;
        done();
      });
    });

  it('deletes a project', function () {
      const project = session.Project.last();
      const projectId = project.id;

      const action = deleteEntity('Project', projectId);

      const newState = entity(session.state, action);
      const updatedSession = orm.session(newState);
      const projects = updatedSession.Project;

      expect(projects.count()).to.equal(1);
  });
});
