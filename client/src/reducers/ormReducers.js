import orm from '../schema/schema';

const initialState = orm.getEmptyState();

export function loadData(state, payload) {
    const session = orm.mutableSession(state);

    const { Project } = session;
    const { Module } = session;

    const { projects } = payload;

    projects.forEach((project, i) => {
      Project.create({
        name: project.name
      });

      project.modules.forEach(module => {
        const _module = Object.assign({}, module, { project: i })
        Module.create(_module);
      });
    });

    return session.state;
}

const updateModule = (state, payload) => {
  const session = orm.session(state);
  const { Module } = session;
  Module.withId(0).update({name: 'new name'});

  return session.state;
}

export const entities = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_ORM':
      const res = loadData(state, action.payload);
      return loadData(state, action.payload)
    case 'UPDATE_MODULE':
      return updateModule(state, action.payload)
    default:
      return state;
  }
};
