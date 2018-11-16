export const undoable = (reducer) => {
    const initialState = {
      past: [],
      present: reducer(undefined, {}),
      future: [],
    };

  return (state, action) => {
    // const { past, present, future } = state;
    // const newPresent = reducer(present, action);
    //
    // const newState = {
    //   // past: !skipPrevState ? [...past, present] : past,
    //   past: [...past, present],
    //   present: newPresent,
    //   future: [],
    // };

    const reducerResult = reducer(state, action);
    const res =  Object.assign({}, reducerResult);

    return res;
  }
}

export function undoable2(reducer, callback) {
  const initialState = {
    past: [],
    present: reducer(undefined, {}),
    future: [],
  };

  return function (state, action) {
  // return function (state = initialState, action) {
    const { past, present, future } = state;

    switch (action.type) {
      case 'UNDO':
        const previous = past[past.length - 1];
        const newPast = past.slice(0, past.length - 1);

        if (!previous) {
          return state;
        }

        return {
          past: newPast,
          present: previous,
          future: [present, ...future],
        };
      case 'REDO':
        const next = future[0];
        const newFuture = future.slice(1);

        if (!next) {
          return state;
        }

        return {
          past: [...past, present],
          present: next,
          future: newFuture,
        };
      default:
        const { skipPrevState } = action;
        const newPresent = reducer(present, action);

        if (JSON.stringify(present) === JSON.stringify(newPresent)) {
          return state;
        }

        return {
          // past: !skipPrevState ? [...past, present] : past,
          past: [...past, present],
          present: newPresent,
          future: [],
        };
    }
  };
}
