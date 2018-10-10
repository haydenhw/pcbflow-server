import { expect } from 'chai';
import { getSessionWithTestData } from '../test/utils';
import  orm from '../schema/schema';
import  { createEntity }from '../actions/indexActions';
import { ENTITY_CREATE } from '../constants/actionTypes';
import { entity } from './entityReducer';
import { Project } from '../models/projectsModel';

describe('entity reducer create', function () {
  let session;
    beforeEach(done => {
      getSessionWithTestData().then(sessionWithTestData => {
        session = sessionWithTestData;
        done();
      });
    });

  it('creates a project', function () {
      const action = createEntity('Project', {
        _id: '4321',
        board: 3,
        id: 27,
        name: 'new module',
        ownderId: 'alsdjjkfdls',
      })

      const newState = entity(session.state, action);
      const updatedSession = orm.session(newState);
      const projects = updatedSession.Project;
      const module = updatedSession.Project.last();

      const { payload } = action;
      const { newItemAttributes } =  payload;
      const { board, id, name, ownerId } = newItemAttributes;

      expect(projects.count()).to.equal(3);

      expect(module.name).to.equal(name);
      expect(module.id).to.equal(id);
      expect(module.ownerId).to.equal(ownerId);
      expect(module.board).to.deep.equal(board);
  });

  it('creates a module', function () {
      const action = createEntity('Module', {
        text: 'new module',
        x: 50,
        y: 50,
        id: 100,
        rotation: 3,
      });

      const newState = entity(session.state, action);
      const updatedSession = orm.session(newState);
      const modules = updatedSession.Module;
      const module = updatedSession.Module.last();
      console.log(module);

      const { payload } = action;
      const { newItemAttributes } =  payload;
      const { text, x , y ,id, rotation } = newItemAttributes;

      expect(modules.count()).to.equal(7);

      expect(module.text).to.equal(text);
      expect(module.id).to.equal(id);
      expect(module.x).to.equal(x);
      expect(module.y).to.deep.equal(y);
  });
});
