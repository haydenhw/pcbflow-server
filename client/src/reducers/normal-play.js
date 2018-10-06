import merge from 'lodash.merge';
import { combineReducers } from 'redux';

const exercises = (state = {}, action) => {
  switch (action.type) {
  case 'CREATE_EXERCISE':
    return {
      ...state,
      [action.id]: {
        ...action.exercise
      }
    };
  case 'UPDATE_EXERCISE':
    return {
      ...state,
      [action.id]: {
        ...state[action.id],
        ...action.exercise
      }
    };
  default:
    if (action.entities && action.entities.exercises) {
      return merge({}, state, action.entities.exercises);
    }
    return state;
  }
}

const plans = (state = {}, action) => {
  switch (action.type) {
  case 'CREATE_PLAN':
    return {
      ...state,
      [action.id]: {
        ...action.plan
      }
    };
  case 'UPDATE_PLAN':
    return {
      ...state,
      [action.id]: {
        ...state[action.id],
        ...action.plan
      }
    };
  case 'UPDATE_PLAN':
    return {
      ...state,
      [action.id]: {
        ...state[action.id],
        ...action.plan
      }
    };
  default:
    if (action.entities && action.entities.plans) {
      return merge({}, state, action.entities.plans);
    }
    return state;
  }
}

export const entities = combineReducers({
  plans,
  exercises
});

const currentPlans = (state = [], action) => {
  switch (action.type) {
  case 'CREATE_PLAN':
    return [...state, action.id];
  default:
    return state;
  }
}
