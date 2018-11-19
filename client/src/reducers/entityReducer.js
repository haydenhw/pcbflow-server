import orm from "../schema/schema";

import {
    ENTITY_UPDATE,
    ENTITY_DELETE,
    ENTITY_CREATE,
    FETCH_PROJECTS_SUCCESS,
} from "../constants/actionTypes";

const initialState = orm.getEmptyState();

export function loadProjects(state, projects=[]) {
    const session = orm.session(state);
    const { Module, Project } = session;

    projects.forEach((project, i) => {
      const { modules, ...projectProps } = project ;
      Project.create({ ...projectProps });

      modules.forEach(module => {
        const _module = Object.assign({}, module, { project: i })
        Module.create(_module);
      });
    });

    return session.state;
}

export function updateEntity(state, payload) {
    const { itemType, itemID, newItemAttributes } = payload;

    const session = orm.session(state);
    const ModelClass = session[itemType];

    if (ModelClass.hasId(itemID)) {
        const modelInstance = ModelClass.withId(itemID);

        modelInstance.update(newItemAttributes);
    }

    return session.state;
}

export function deleteEntity(state, payload) {
  const { itemID, itemType } = payload;

  const session = orm.session(state);
  const ModelClass = session[itemType];

  if (ModelClass.hasId(itemID)) {
      const modelInstance = ModelClass.withId(itemID);

      modelInstance.delete();
  }

  return session.state;
}

export function createEntity(state, payload) {
    const { itemType, newItemAttributes } = payload;

    const session = orm.session(state);
    const ModelClass = session[itemType];

    ModelClass.create(newItemAttributes);

    return session.state;
}

export const entities = (state=initialState, action) => {
  switch (action.type) {
    case FETCH_PROJECTS_SUCCESS:
      return loadProjects(state, action.projects)
    case ENTITY_CREATE:
      return createEntity(state, action.payload);
    case ENTITY_DELETE:
      return deleteEntity(state, action.payload)
    case ENTITY_UPDATE:
      return updateEntity(state, action.payload)
    default:
      return state;
  }
};
