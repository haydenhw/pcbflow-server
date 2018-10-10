import { expect } from 'chai';
import { Project } from '../models/projectsModel';
import  orm from '../schema/schema';
import { entity} from '../reducers/entityReducer';
import { getSessionWithTestData } from './utils';


describe('Entity reducer create handler', function () {
  let session;
    beforeEach(done => {
      getSessionWithTestData().then(sessionWithTestData => {
        session = sessionWithTestData;
        // const res = session.Project.last().ref;
        // console.log(res)
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

      const newState = entity(session.state, action);
      const updatedSession = orm.session(newState);
      const projects = updatedSession.Project;
      const project = updatedSession.Project.last();

      const { payload } = action;
      const { newItemAttributes } =  payload;
      const { board, id, name, ownerId } = newItemAttributes;

      expect(projects.count()).to.equal(3);

      expect(project.name).to.equal(name);
      expect(project.id).to.equal(id);
      expect(project.ownerId).to.equal(ownerId);
      expect(project.board).to.deep.equal(board);
  });
});
