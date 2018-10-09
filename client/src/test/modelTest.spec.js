import { expect } from 'chai';
import { Project } from '../models/projectsModel';
import  orm from '../schema/schema';
import factory from './factories';
import Promise from 'bluebird';
import { applyActionAndGetNextSession, ReduxORMAdapter } from './utils';
import { entity} from '../reducers/entityReducer';


describe('Entity reducer create handler', function () {
  let state, session;

  beforeEach(done => {

    state = orm.getEmptyState();
    session = orm.mutableSession(state);

    factory.setAdapter(new ReduxORMAdapter(session));

    factory.createMany('Project', 2).then(()=> {
      done();
    });
  });

  it('creates a project', function () {
    const action = {
      type: 'ENTITY_CREATE',
      payload : {
        itemType: 'Project',
        newItemAttributes: {
          _id: '4321',
          board: 3,
          id: 27,
          name: 'new project',
          ownderId: 'alsdjjkfdls',
        },
      }
    };

   // const getProject = state
  const newState = entity(state, action);
  const updatedSession = orm.session(newState);
  const projects = updatedSession.Project;
  const project = updatedSession.Project.last();//.all().toRefArray();

  const { payload } = action;
  const { newItemAttributes } =  payload;
  const { board, id, name, ownerId } = newItemAttributes;

  expect(projects.count()).to.equal(3);

  expect(project.board).to.equal(board);
  expect(project.name).to.equal(name);
  expect(project.id).to.equal(id);
  expect(project.ownerId).to.equal(ownerId);


    // console.log(newState);
    // console.log(session.Project.all().toRefArray()[0]);
  });
});
