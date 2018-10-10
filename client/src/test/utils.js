import Promise from 'bluebird';
import  orm from '../schema/schema';
import factory from './factories';

export function applyActionAndGetNextSession(schema, state, action) {
    const nextState = schema.from(state, action).reduce();
    return schema.from(nextState);
}

export class ReduxORMAdapter {
    constructor(session) {
        this.session = session;
    }

    build(modelName, props) {
        return this.session[modelName].create(props);
    }

    get(doc, attr) {
        return doc[attr];
    }

    set(props, doc) {
        doc.update(props);
    }

    save(doc, modelName, cb) {
        process.nextTick(cb);
    }

    destroy(doc, modelName, cb) {
        doc.delete();
        process.nextTick(cb);
    }
}

export const getSessionWithTestData = () => {
  const state = orm.getEmptyState();
  const session = orm.mutableSession(state);

  factory.setAdapter(new ReduxORMAdapter(session));

  return factory.createMany('Project', 2).then((projects) => {
    return Promise.all(projects.map(project => {
      const projectId = project.id;

      return factory.createMany('Module', { project: projectId }, 3);
    })).then(() => {
      return session;
    })
  });
}
