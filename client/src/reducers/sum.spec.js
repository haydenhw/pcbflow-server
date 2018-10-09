import orm from '../schema/schema';
import Project from '../models/projectsModel';

import { entities } from './ormReducers';
import { projects } from '../data/projects';
const prettyPrint = (obj) => console.log(JSON.stringify(obj, null, 2));

const state = orm.getEmptyState();

const action = {
  type: 'UPDATE_ORM',
  payload: { projects },
}

const res = entities(state, action)
