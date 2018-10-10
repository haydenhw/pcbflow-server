import { getCreateEntityAction } from './entityActions';
import { ENTITY_CREATE, ENTITY_CREATE_SUCCESS, ENTITY_CREATE_REQUEST } from '../constants/actionTypes';

const createEntity = getCreateEntityAction(ENTITY_CREATE);
const createEntityRequest = getCreateEntityAction(ENTITY_CREATE_REQUEST);
const createEntitySuccess = getCreateEntityAction(ENTITY_CREATE_SUCCESS);

const res = createEntitySuccess('Project', {
  _id: '4321',
  board: 3,
  id: 27,
  name: 'new module',
  ownderId: 'alsdjjkfdls',
});

test('adds 1 + 2 to equal 3', () => {
  expect((1 + 2)).toBe(3);
});
