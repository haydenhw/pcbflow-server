import chai from 'chai';
import chaiThings from 'chai-things';
import { getSessionWithTestData } from '../test/utils';
import  orm from '../schema/schema';
import { getProjects, getActiveProject, getActiveProjectBoard } from './projectSelectors'

const { expect, should }  = chai;
should();
chai.use(chaiThings);

describe('project selectors', function () {
  let session;
    beforeEach(done => {
      getSessionWithTestData().then(sessionWithTestData => {
        session = sessionWithTestData;
        done();
      });
    });

  it('gets projects', function () {
      const initialProjectCount =  session.Project.count();
      const selectedProjects = getProjects.resultFunc(session);

      expect(selectedProjects.length).to.equal(initialProjectCount);
      selectedProjects.should.all.have.property('name');
  });

  it('gets active project', function () {
      const activeProjectId =  session.Project.last()._id;
      const activeProject = getActiveProject.resultFunc(session, null);

      expect(activeProject._id).to.equal(activeProjectId);
  });

  it('gets active project board', function () {
      const activeProject =  session.Project.last().ref;
      const board = getActiveProjectBoard.resultFunc(activeProject);

      expect(board).to.have.property('x');
      expect(board).to.have.property('y');
  });
});
