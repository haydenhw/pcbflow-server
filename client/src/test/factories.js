import _factory from 'factory-girl';
import bluebird from 'bluebird';
import Chance from 'chance';

import Project from '../models/projectsModel';
import Module from '../models/modulesModel';

const factory = _factory.promisify(bluebird);

factory.define('Project', 'Project', {
    id: factory.sequence(n => n),
    _id: factory.sequence(n => `string-id-${n}`),
    ownderId: factory.sequence(n => n),
    name: factory.sequence(n => `name-${n}`),
    boardSpecs: {
      x: Math.floor(Math.random() * 500),
      y: Math.floor(Math.random() * 500),
      anchors: {
        topLeft: {
          x: Math.floor(Math.random() * 500),
          y: Math.floor(Math.random() * 500),
        }
      }
    },
});

factory.define('Module', 'Module', {
      id: factory.sequence(n => n),
      rotation: Math.floor(Math.random() * 3),
      text: factory.sequence(n => `module-${n}`),
      x: Math.floor(Math.random() * 500),
      y: Math.floor(Math.random() * 500),
});

export default factory;
