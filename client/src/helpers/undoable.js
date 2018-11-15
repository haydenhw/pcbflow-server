export const undoable = (reducer) => {
  return (state, action) => {

    const initialState = {
      past: [],
      present: reducer(undefined, {}),
      future: [],
    };

    const obj = {
      foo: "bar",
    }

    const reducerResult = reducer(state, action);
    // const reducerResult = reducer(state=initialState, action);
    // console.log(res);
    const res =  Object.assign({}, reducerResult, obj);

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

        return newPresent;

        if (JSON.stringify(present) === JSON.stringify(newPresent)) {
          return state;
        }

        return {
          past: !skipPrevState ? [...past, present] : past,
          present: newPresent,
          future: [],
        };
    }
  };
}
