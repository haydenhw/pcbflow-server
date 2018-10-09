import * as actions from '../actions/indexActions';

import orm from "../schema/schema";

export function updateEntity(state, payload) {
    const {itemType, itemID, newItemAttributes} = payload;

    const session = orm.session(state);
    const ModelClass = session[itemType];

    if(ModelClass.hasId(itemID)) {
        const modelInstance = ModelClass.withId(itemID);

        modelInstance.update(newItemAttributes);
    }

    return session.state;
}

export function deleteEntity(state, payload) {
    const {itemID, itemType} = payload;

    const session = orm.session(state);
    const ModelClass = session[itemType];

    if(ModelClass.hasId(itemID)) {
        const modelInstance = ModelClass.withId(itemID);

        // The session will immutably update its state reference
        modelInstance.delete();
    }

    // This will either be the original state object or the updated one
    return session.state;
}

export function createEntity(state, payload) {
    const {itemType, newItemAttributes} = payload;

    const session = orm.session(state);
    const ModelClass = session[itemType];

    ModelClass.create(newItemAttributes);

    return session.state;
}

export const entity = (state={}, action) => {
  switch (action.type) {
    case 'ENTITY_CREATE':
      return createEntity(state, action.payload);
    case actions.ENTITY_UPDATE:
    case actions.ENTITY_DELETE:
    default:
      return state;
  }
};
