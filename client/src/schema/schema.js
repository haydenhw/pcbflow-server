import { ORM } from "redux-orm";

import Project from '../models/projectsModel';
import Module from '../models/modulesModel';

const orm = new ORM();
orm.register(Project, Module);

export default orm;
