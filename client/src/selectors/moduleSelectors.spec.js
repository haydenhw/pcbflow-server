import { expect } from 'chai';
import  orm from '../schema/schema';
import { getSessionWithTestData } from '../test/utils';
import { getModules, getActiveModules, getModulesByProject } from './moduleSelectors';


describe('module selectors', function () {
  let session;
  let mockState;
    beforeEach(done => {
      getSessionWithTestData().then(sessionWithTestData => {
        session = sessionWithTestData;
        done();
      });
    });

  it('should return all modules', function () {
      const mockState = {
        entities: session.state,
      }

      const moduleCount = session.Module.count();
      const selectedModuleCount = getModules(mockState).length;

      expect(moduleCount).to.equal(selectedModuleCount);
  });

  it('should return active modules', function () {
      const projectId = session.Project.first().id;
      const childModules = session.Module.filter({ project: projectId}).toRefArray();

      const mockState = {
        entities: session.state,
        projects: {
          activeProjectId: projectId,
        },
      }

      const activeModules =  getActiveModules(mockState);

      expect(childModules.length).to.be.above(0)
      expect(childModules.length).to.equal(activeModules.length);
  });

  it('should return modules for a given project', function () {
      const projectId = session.Project.last().id;
      const childModules = session.Module.filter({ project: projectId }).toRefArray();

      const mockState = {
        entities: session.state,
        projects: {
          activeProjectId: projectId,
        },
      }

      const activeModules = getModulesByProject(projectId)(mockState);

      expect(childModules.length).to.be.above(0)
      expect(childModules.length).to.equal(activeModules.length);
  });
});
