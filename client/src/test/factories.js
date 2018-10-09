import _factory from 'factory-girl';
import bluebird from 'bluebird';
import Chance from 'chance';

import Project from '../models/projectsModel';

const factory = _factory.promisify(bluebird);

factory.define('Project', 'Project', {
    id: factory.sequence(n => n),
    ownderId: factory.sequence(n => n),
    name: factory.sequence(n => `name-${n}`),
    board: Math.floor(Math.random() * 5),
});

export default factory;
