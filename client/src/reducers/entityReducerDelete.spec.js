import { expect } from 'chai';
import { getSessionWithTestData } from '../test/utils';
import  orm from '../schema/schema';
import  { deleteEntity }from '../actions/indexActions';
import { ENTITY_CREATE } from '../constants/actionTypes';
import { entities } from './entityReducer';


describe('entities reducer delete', function () {
  let session;
    beforeEach(done => {
      getSessionWithTestData().then(sessionWithTestData => {
        session = sessionWithTestData;
        done();
      });
    });

  it('deletes a project', function () {
      const initialProjectCount =  session.Project.count();
      const project = session.Project.last();
      const projectId = project.id;

      const action = deleteEntity('Project', projectId);

      const newState = entities(session.state, action);
      const updatedSession = orm.session(newState);
      const projects = updatedSession.Project;

      expect(projects.count()).to.equal(initialProjectCount - 1);
  });

  it('deletes a module', function () {
      const initialModuleCount =  session.Module.count();
      const module = session.Module.last();
      const moduleId = module.id;
      const action = deleteEntity('Module', moduleId);

      const newState = entities(session.state, action);
      const updatedSession = orm.session(newState);
      const modules = updatedSession.Module;

      expect(modules.count()).to.equal(initialModuleCount - 1);
      expect(modules.filter({ id: moduleId }).first()).to.equal(undefined);
  });
});
