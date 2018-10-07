import orm from '../schema/schema';

const initialState = orm.getEmptyState();

export function loadData(state, payload = []) {
    // Create a Redux-ORM session from our entities "tables"
    const session = orm.mutableSession(state);
    // Get a reference to the correct version of model classes for this Session
    const { Project } = session;
    const { Module } = session;
    const projects = payload;

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

export const entities = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PROJECTS_SUCCESS':
      const res = loadData(state, action.projects);

      return loadData(state, action.payload)
    default:
      return state;
  }
};
