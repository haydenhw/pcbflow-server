import orm from "../schema/schema";
import * as actions from '../actions/indexActions';

import {
    ENTITY_UPDATE,
    ENTITY_DELETE,
    ENTITY_CREATE,
    ENTITY_CREATE_SUCCESS,
    ENTITY_CREATE_REQUEST ,
} from "../constants/actionTypes";

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

export const entity = (state={}, action) => {
  switch (action.type) {
    case ENTITY_CREATE:
    case ENTITY_CREATE_REQUEST:
      return createEntity(state, action.payload);
    case ENTITY_DELETE:
      return deleteEntity(state, action.payload)
    case ENTITY_UPDATE:
    default:
      return state;
  }
};
