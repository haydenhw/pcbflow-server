import { expect } from 'chai';
import { getSessionWithTestData } from '../test/utils';
import  orm from '../schema/schema';
import  { updateEntity }from '../actions/indexActions';
import { entities } from './entityReducer';
import { Project } from '../models/projectsModel';

describe('entities reducer update', function () {
  let session;
    beforeEach(done => {
      getSessionWithTestData().then(sessionWithTestData => {
        session = sessionWithTestData;
        done();
      });
    });

  it('updates a project\'s name' , function () {
      const newName = 'updated name';
      const initialProject = session.Project.last();
      const initialId =  initialProject.id;
      const action = updateEntity(
        'Project',
        initialId,
        { name: newName }
      );

      const newState = entities(session.state, action);
      const updatedSession = orm.session(newState);
      const updatedProject = updatedSession.Project.last();

      expect(updatedProject.name).to.equal(newName);
  });
});
