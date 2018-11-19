import { expect } from 'chai';
import { getSessionWithTestData } from '../test/utils';
import  orm from '../schema/schema';
import  { createEntity, createEntityRequest }from '../actions/indexActions';
import { entities } from './entityReducer';
import { Project } from '../models/projectsModel';

describe('entities reducer create', function () {
  let session;
    beforeEach(done => {
      getSessionWithTestData().then(sessionWithTestData => {
        session = sessionWithTestData;
        done();
      });
    });

  it('creates a project', function () {
      const action = createEntityRequest('Project', {
        _id: '4321',
        board: 3,
        id: 27,
        name: 'new module',
        ownderId: 'alsdjjkfdls',
      })

      const newState = entities(session.state, action);
      const updatedSession = orm.session(newState);
      const initialProjectCount =  session.Project.count();
      const projects = updatedSession.Project;
      const project = updatedSession.Project.last();
      const { payload } = action;
      const { newItemAttributes } =  payload;
      const { board, id, name, ownerId } = newItemAttributes;

      expect(projects.count()).to.equal(initialProjectCount + 1);

      expect(project.name).to.equal(name);
      expect(project.id).to.equal(id);
      expect(project.ownerId).to.equal(ownerId);
      expect(project.board).to.deep.equal(board);
  });

  it('creates a module', function () {
      const action = createEntity('Module', {
        text: 'new module',
        x: 50,
        y: 50,
        id: 100,
        rotation: 3,
      });

      const newState = entities(session.state, action);
      const updatedSession = orm.session(newState);
      const initialModuleCount =  session.Module.count();
      const modules = updatedSession.Module;
      const module = updatedSession.Module.last();

      const { payload } = action;
      const { newItemAttributes } =  payload;
      const { text, x , y ,id, rotation } = newItemAttributes;

      expect(modules.count()).to.equal(initialModuleCount + 1);

      expect(module.text).to.equal(text);
      expect(module.id).to.equal(id);
      expect(module.x).to.equal(x);
      expect(module.y).to.deep.equal(y);
  });
});
