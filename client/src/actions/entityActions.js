import{
    ENTITY_UPDATE,
    ENTITY_DELETE,
    ENTITY_CREATE,
    ENTITY_CREATE_SUCCESS,
    ENTITY_CREATE_REQUEST ,
} from "../constants/actionTypes";

export function updateEntity(itemType, itemID, newItemAttributes) {
    return {
        type : ENTITY_UPDATE,
        payload : {
            itemType,
            itemID,
            newItemAttributes,
        },
    };
}

export function deleteEntity(itemType, itemID) {
    return {
        type : ENTITY_DELETE,
        payload : {
          itemType,
          itemID
        }
    };
}

export const getCreateEntityAction = (actionType) => {
  return (itemType, newItemAttributes) => ({
    type: actionType,
    payload: {
      itemType,
      newItemAttributes,
    }
  });
}

export const createEntity = getCreateEntityAction(ENTITY_CREATE);
export const createEntityRequest = getCreateEntityAction(ENTITY_CREATE_REQUEST);
export const createEntitySuccess = getCreateEntityAction(ENTITY_CREATE_SUCCESS);
