import { createSelector } from 'reselect'
import orm from '../schema/schema';

export const getEntities = state => state.entities;

export const getEntitiesSession = createSelector(
    getEntities,
    entities => orm.session(entities)
);
