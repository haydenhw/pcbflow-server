import factory from './factories.js';
import orm from '../schema/schema';
import { ReduxORMAdapter } from './utils';

const initialState = orm.getEmptyState();
const session = orm.mutableSession(initialState);

factory.setAdapter(new ReduxORMAdapter(session));

factory
  .build('Project')
  .then(project => {console.log(project)});


test('adds 1 + 2 to equal 3', () => {
  expect(1).toBe(1);
});
