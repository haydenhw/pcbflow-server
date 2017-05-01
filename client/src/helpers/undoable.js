export default function undoable(reducer) {
  // Call the reducer with empty action to populate the initial state
  
  const initialState = {
    past: [],
    present: reducer(undefined, {}),
    future: []
  }

  // Return a reducer that handles undo and redo
  return function (state = initialState, action) {
    const { past, present, future } = state;
    
    switch (action.type) {
      case 'UNDO':
        const shouldSkipElement = callback && callback(past);
        const element = shouldSkipElement ? 2 : 1;
        const previous = past[past.length - element]
        const newPast = past.slice(0, past.length - element)
        return {
          past: newPast,
            present: previous,
            future: [ present, ...future ]
          }
      case 'REDO':
        const next = future[0]
        const newFuture = future.slice(1)
        return {
          past: [ ...past, present ],
          present: next,
          future: newFuture
        }
      default:
        // Delegate handling the action to the passed reducer
        const newPresent = reducer(present, action)
  
        if (JSON.stringify(present) === JSON.stringify(newPresent)) {
          return state
        }
        return {
          past: [ ...past, present ],
          present: newPresent,
          future: []
        }
    }
  }
}